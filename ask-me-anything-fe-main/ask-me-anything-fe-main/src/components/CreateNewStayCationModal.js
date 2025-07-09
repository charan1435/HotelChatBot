import React, {  useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import "./CreateNewStayCationModal.css";
import {
  createUserStaycationRequest,
  createUserStaycationSuccess,
  createUserStaycationFailure,
  createUserStaycation
} from "../Redux/actions/StaycationActions";
import { useNavigate } from "react-router-dom";

function CreateNewStayCationModal(props) {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [roomNo, setRoomNo] = useState("");
  const [userCode, setUserCode] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const createUserStaycationError = useSelector(state => state.staycation.staycation.error);
  const createUserStaycationSuccessMessage = useSelector(state => state.staycation.staycation.success);

  // console.log(createUserStaycationError)
  // console.log(createUserStaycationSuccessMessage)

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createUserStaycationRequest());
    dispatch(createUserStaycation(userCode, roomNo, password))
      .then((response) => {
        dispatch(createUserStaycationSuccess(response.payload));
        props.setOpenModal(false);
        navigate("/myvacations"); // redirect to MyVacations page
        setSuccessMessage(createUserStaycationSuccessMessage); // set success message
        setErrorMessage(""); // clear error message
      })
      .catch((error) => {
        dispatch(createUserStaycationFailure(error.payload));
        setErrorMessage(createUserStaycationError); // set error message
        setSuccessMessage(""); // clear success message
      });
  };


  // console.log(successMessage)
  // console.log(errorMessage)

  return (
    <div className="modal-wrapper">
      <div className="modal-background" onClick={() => props.setOpenModal(false)}></div>
      <div className="modal-content">
        <span className="close" onClick={() => props.setOpenModal(false)}>
          &times;
        </span>
        {createUserStaycationSuccessMessage && (
          <div className="success-message">
            {createUserStaycationSuccessMessage}
          </div>
        )}
        {createUserStaycationError && (
          <div className="error-message">
            {createUserStaycationError}
          </div>
        )}
        {createUserStaycationSuccessMessage}
        {createUserStaycationError}
        <form onSubmit={handleSubmit}>
          <label htmlFor="roomNo">Room No:</label>
          <input
            type="text"
            id="roomNo"
            name="roomNo"
            value={roomNo}
            onChange={(e) => setRoomNo(e.target.value)}
            required
          />
          <label htmlFor="userCode">Unique User Code:</label>
          <input
            type="text"
            id="userCode"
            name="userCode"
            value={userCode}
            onChange={(e) => setUserCode(e.target.value)}
            required
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Create Staycation</button>
        </form>
      </div>
    </div>
  );
}

export default CreateNewStayCationModal;
