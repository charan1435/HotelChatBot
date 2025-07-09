import React, { useState, useEffect } from "react"
import "./StaycationCard.css";



function StaycationCard(){

     // usestate for setting a javascript
    // object for storing and using data
    const [product, setProduct] = useState({
        id: 0,
        description: "",
        name: "",
        price: "",
        qty:0
    });

        // Using useEffect for single rendering
        // useEffect(() => {
        //     // Using fetch to fetch the api from 
        //     // flask server it will be redirected to proxy
        //     fetch("/").then((res) =>
        //         res.json().then((data) => {
        //             // Setting a data from api
        //             console.log(data)
        //             setProduct({
        //                 id: data.id,
        //                 description: data.description,
        //                 name: data.name,
        //                 price: data.price,
        //                 qty:data.qty
        //             });
        //         })
        //     );
        // }, []);



    return(
        <div id="card">
            <div id="cardbody">
                <p id="hotelName"> Cinnamon Hotel</p>
                <p id="dates">Date : 24th April</p>
                <div id="btnBody">
                    <button id="btn1"> Start New Conversation</button>
                    <button id="btn2">View History Conversation</button>

                </div>
            </div>
        </div>        
    )

}

export default StaycationCard;