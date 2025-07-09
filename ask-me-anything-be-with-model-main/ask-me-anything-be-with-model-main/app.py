from flask import Flask, request, jsonify,session
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import and_, or_, not_
from flask_marshmallow import Marshmallow
import os
from datetime import datetime
import re
from flask_cors import CORS, cross_origin
from sqlalchemy import create_engine
from sqlalchemy.pool import QueuePool
import bcrypt
from werkzeug.security import generate_password_hash, check_password_hash
import openai
from typing import Union
import tensorflow as tf
from tensorflow import keras


openai.api_key = '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'

# Load the saved H5 model
model = keras.models.load_model("model.h5")

def get_api_response(prompt: str) -> Union[str, None]:
    text: Union[str, None] = None

    try:
        response = openai.Completion.create(
            model='text-davinci-003',
            prompt=prompt,
            temperature=0.9,
            max_tokens=150,
            top_p=1,
            frequency_penalty=0,
            presence_penalty=0.6,
            stop=[' Human:', ' AI:']
        )

        if isinstance(response, dict):
            choices = response.get('choices')[0]
            text = choices.get('text')

    except Exception as e:
        print('ERROR:', e)

    return text


def update_list(message: str, pl: list[str]):
    pl.append(message)


def create_prompt(message: str, pl: list[str]) -> str:
    p_message: str = f'\nHuman: {message}'
    update_list(p_message, pl)
    prompt: str = ''.join(pl)
    return prompt


def get_bot_response(message: str, pl: list[str]) -> str:
    prompt: str = create_prompt(message, pl)
    bot_response: str = get_api_response(prompt)

    if bot_response:
        update_list(bot_response, pl)
        pos: int = bot_response.find('\nAI: ')
        bot_response = bot_response[pos + 5:]
    else:
        bot_response = 'Something went wrong...'

    return bot_response

# init app
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
basedir = os.path.abspath(os.path.dirname(__file__))

# database``
app.config['SQLALCHEMY_DATABASE_URI' ] = 'sqlite:///' + os.path.join(basedir,'db.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {
    "poolclass": QueuePool,
    "pool_size": 10,
    "max_overflow": 20,
    "pool_timeout": 30,
}

app.secret_key = 'your_secret_key'

db = SQLAlchemy(app, engine_options=app.config['SQLALCHEMY_ENGINE_OPTIONS'])

# init db
# db = SQLAlchemy(app)

# init ma
ma = Marshmallow(app)

# product class/mo`del
class Product(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    name = db.Column(db.String(100),unique=True)
    description = db.Column(db.String(200))
    price = db.Column(db.Float)
    qty = db.Column(db.Integer)

    def __init__(self, name, description, price,qty):
        self.name = name
        self.description = description
        self.price = price
        self.qty = qty


# user class/model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    contact_number = db.Column(db.String(20), nullable=True)
    password_hash = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __init__(self, email, contact_number, password):
        self.email = email
        self.contact_number = contact_number
        self.set_password(password)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
        
# hotel class/model
class Hotel(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    name = db.Column(db.String(100),unique=True)
    description = db.Column(db.String(200))
    location = db.Column(db.String(100))

    def __init__(self, name, description, location):
        self.name = name
        self.description = description
        self.location = location



# staycation class/model
class StayCations(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    hotelid = db.Column(db.Integer, db.ForeignKey(Hotel.id))
    roomNo = db.Column(db.String(10))
    guestUniqueId = db.Column(db.String(10))
    uniquePassword_hash = db.Column(db.String(255))

    def __init__(self, hotelid, roomNo, guestUniqueId, password):
        self.hotelid = hotelid
        self.roomNo = roomNo
        self.guestUniqueId = guestUniqueId
        if password is not None:
            self.set_password(password)

    def set_password(self, password):
        self.uniquePassword_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.uniquePassword_hash, password)

# user staycation class/model
class UserStaycation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    userid = db.Column(db.Integer, db.ForeignKey(User.id))
    staycationid = db.Column(db.Integer, db.ForeignKey(StayCations.id))

    def __init__(self, userid, staycationid):
        self.userid = userid
        self.staycationid = staycationid

# chathistory class/model
class ChatHistory(db.Model):
    id = db.Column(db.Integer,primary_key=True,autoincrement=True)
    userid = db.Column(db.Integer,db.ForeignKey(User.id))
    userstaycationid = db.Column(db.Integer,db.ForeignKey(UserStaycation.id))
    respondent = db.Column(db.String(100))
    query = db.Column(db.String(100))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __init__(self, userid, userstaycationid, respondent,query):
        self.userid = userid
        self.userstaycationid = userstaycationid
        self.respondent = respondent
        self.query = query

# product schema
class ProductSchema(ma.Schema):
    class Meta:
        fields = ('id','name','description','price','qty')

# user schema
class UserSchema(ma.Schema):
    class Meta:
        fields = ('id','email','contact_number','password','created_at')

# hotel schema
class HotelSchema(ma.Schema):
    class Meta:
        fields = ('id','name','description','location')

# Chatbot schema
class ChatbotSchema(ma.Schema):
    class Meta:
        fields = ('id','userid','userstaycationid','respondent','query','created_at')

# Staycation schema
class StaycationSchema(ma.Schema):
    class Meta:
        fields = ('id','hotelid','roomNo','guestUniqueId','uniquePassword_hash')

# user-staycation schema
class UserStaycationSchema(ma.Schema):
    class Meta:
        fields = ('id','userid','staycationid')

# init schema
product_schema = ProductSchema()
products_schema = ProductSchema(many=True)

# init User
user_schema = UserSchema()

# init Hotel
hotel_schema = HotelSchema()
hotels_schema = HotelSchema(many=True)

# init chatbothistory
chatbot_schema = ChatbotSchema()
chatbots_schema = ChatbotSchema(many=True)

# init staycation
staycation_schema  = StaycationSchema()

# init user-staycation
userStaycation_schema = UserStaycationSchema()
userStaycations_schema = UserStaycationSchema(many=True)



# create a product
@app.route('/product',methods=['POST'])
def add_product():
    name = request.json['name']
    description = request.json['description']
    price = request.json['price']
    qty = request.json['qty']

    new_product = Product(name,description,price,qty)

    db.session.add(new_product)
    db.session.commit()

    return product_schema.jsonify(new_product)

# create a user
@app.route('/user', methods=['POST'])
def create_user():
    data = request.get_json()

    # Check that all required fields are present
    if not all(key in data for key in ['email', 'contact_number', 'password']):
        return jsonify({'message': 'Missing fields'}), 400

    # Check that the email is a valid email address
    if not re.match(r"[^@]+@[^@]+\.[^@]+", data['email']):
        return jsonify({'message': 'Invalid email address'}), 400

    # Check that the contact_number is a valid phone number
    if not re.match(r"^\d{10}$", data['contact_number']):
        return jsonify({'message': 'Invalid phone number'}), 400

    # Create the new user
    new_user = User(email=data['email'], contact_number=data['contact_number'], password=data['password'])
    db.session.add(new_user)
    db.session.commit()

    # Return a success message with the user's id
    return jsonify({'message': 'User created successfully!', 'id': new_user.id}), 201

# signin
@app.route('/signin', methods=['POST'])
def signin():
    if request.method == 'POST':
        email = request.json.get('email')
        password = request.json.get('password')
        user = User.query.filter_by(email=email).first()

        if user and user.check_password(password):
            session['user_id'] = user.id
            return jsonify({'success': True, 'user_id': user.id})
            # Store user ID in session
            
        else:
            return jsonify({'success': False, 'message': 'Invalid username or password'})

        
#adding chat messages
# @app.route('/chat/<userstaycationid>', methods=['POST'])
# def add_chat(userstaycationid):
#     user_id = session['user_id']
#     # respondent = request.json.get('respondent')
#     query = request.json.get('query')

#      # Determine who sent the message (user or chatbot)
#     if request.json.get('respondent') == 'User':
#         respondent = 'User'
#     else:
#         respondent = 'Bot'

#     new_chat = ChatHistory(user_id, userstaycationid, respondent, query)

#     db.session.add(new_chat)
#     db.session.commit()

#     return chatbot_schema.jsonify(new_chat)


# create a hotel
@app.route('/hotel',methods=['POST'])
def add_hotel():
    name = request.json['name']
    description = request.json['description']
    location = request.json['location']

    new_hotel = Hotel(name,description,location)

    db.session.add(new_hotel)
    db.session.commit()

    return hotel_schema.jsonify(new_hotel)

# create a hotel
@app.route('/staycation',methods=['POST'])
def add_staycation():
    hotelid = request.json['hotelid']
    roomid = request.json['roomid']
    guestUniqueId = request.json['guestUniqueId']
    password = request.json['password']

    new_Staycation = StayCations(hotelid,roomid,guestUniqueId,password)

    db.session.add(new_Staycation)
    db.session.commit()

    return staycation_schema.jsonify(new_Staycation)

@app.route('/createUserStaycation', methods=['POST'])
def create_userStaycations():
    # Retrieve the authenticated user's ID
    user_id = session.get('user_id')
    print(user_id)
    # If user is not authenticated, re
    guest_id = request.json.get('guest_id')
    room_no = request.json.get('roomid')
    password = request.json.get('password')
    staycation = StayCations.query.filter_by(guestUniqueId=guest_id, roomNo=room_no).first()

    if staycation and staycation.check_password(password):
        # Check if the user already has a staycation record for this staycation
        user_staycation = UserStaycation.query.filter_by(userid=user_id, staycationid=staycation.id).first()

        if user_staycation:
            # User already has a staycation record for this staycation, return error message
            return jsonify({'message': 'User already has a staycation record for this staycation'}), 400
        else:
            # Create new staycation record for the authenticated user
            new_staycation = UserStaycation(userid=user_id, staycationid=staycation.id)

            # Add the new staycation record to the database session and commit changes
            db.session.add(new_staycation)
            db.session.commit()

            # Return success message
            return jsonify({'message': 'Staycation created successfully'})
    else:
        return jsonify({'message': 'Invalid login details'}), 401

# get all the Staycation by id
@app.route('/user/<int:user_id>/staycations', methods=['GET'])
def get_user_staycations(user_id):
    user_staycations = UserStaycation.query.filter_by(userid=user_id).all()
    
    staycation_list = []
    for user_staycation in user_staycations:
        staycation = StayCations.query.filter_by(id=user_staycation.staycationid).first()
        hotel = Hotel.query.filter_by(id=staycation.hotelid).first()
        staycation_dict = {
            'staycation_id': staycation.id,
            'hotel_name': hotel.name,
            'hotel_location': hotel.location,
            'hotel_id': staycation.hotelid,
            'room_no': staycation.roomNo,
            'guest_id': staycation.guestUniqueId
        }
        staycation_list.append(staycation_dict)
    return jsonify(staycation_list)


# get all product
@app.route('/product',methods=['GET'])
def get_products():
    products = Product.query.all()
    result = products_schema.dump(products)
    return jsonify(result)

# get single product
@app.route('/product/<id>',methods=['GET'])
def get_product(id):
    product = Product.query.get(id)
    return product_schema.jsonify(product) 

# filter chathistory by hotelid and userid
@app.route('/chat/<userstaycationid>/<userid>', methods=['GET'])
def get_chathistory_by_hotelid_and_userid(userstaycationid, userid):
    query = db.session.query(ChatHistory).filter(
        and_(
            ChatHistory.userstaycationid == userstaycationid,
            ChatHistory.userid == userid
        )
    ).all()
    result = [chatbot_schema.dump(chat) for chat in query]
    return jsonify(result)
  

# update a product
@app.route('/product/<id>',methods=['PUT'])
def update_product(id):
    product = Product.query.get(id)

    name = request.json['name']
    description = request.json['description']
    price = request.json['price']
    qty = request.json['qty']

    product.name = name
    product.description = description
    product.price = price
    product.qty = qty

    db.session.commit()

    return product_schema.jsonify(product)

# delete  product
@app.route('/product/<id>',methods=['DELETE'])
def delete_product(id):
    product = Product.query.get(id)
    db.session.delete(product)
    db.session.commit()

# basic route
@app.route('/',methods=['GET'])
def get():
    return jsonify({'msg': 'Hellow WOrld'})

@app.route('/protected')
def protected():
    if 'user_id' in session:
        user_id = session['user_id']
        # Use the user ID to retrieve user information from the database
        # user_info = get_user_info(user_id)
        return f'Hello, {user_id}!'
    else:
        return 'You must be logged in to access this page'
    

@app.route('/chatbot/<userstaycationid>', methods=['POST'])
def chatbot(userstaycationid):
    data = request.json
    user_input = data['input']

    user_id = session['user_id']

    new_chat_user = ChatHistory(user_id, userstaycationid, 'User', user_input)
    db.session.add(new_chat_user)
    db.session.commit()

    prompt_list: list[str] = ['You are an ai based chatbot for a famous hotel in sri lanka who help stay in guests in the hotel',
                              '\nHuman: Hi',
                              '\nAI: Hi back']  # Define your prompt list here
    
    response = get_bot_response(user_input, prompt_list)

    new_chat_bot = ChatHistory(user_id, userstaycationid, 'Bot', response)
    db.session.add(new_chat_bot)
    db.session.commit()

    return response

# run server
if __name__ == '__main__':
    app.run(debug=True)

