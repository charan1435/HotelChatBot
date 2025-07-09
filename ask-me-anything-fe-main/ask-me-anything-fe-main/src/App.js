import React from "react";
import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";

import HomePage from "./pages/Homepage";
import Contactus from "./pages/Contactus";
import Aboutus from "./pages/Aboutus";
import NavBar from "./components/NavBar";
import Mainpage from "./pages/Mainpage";
import SignInPage from "./pages/SignInPage";
import SignupPage from "./pages/Signup"


import "./App.css";
import MyVacations from "./pages/MyVacations";
import Chat from "./pages/Chat";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const loading = useSelector((state) => state.user.loading);

 

  if (loading) {
    // Render a loading spinner or some other indication that the app is loading
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <ToastContainer />
      <NavBar />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/home" element={<Mainpage />} />
        <Route exact path="/aboutus" element={<Aboutus />} />
        <Route exact path="/contactus" element={<Contactus />} />
        <Route exact path="/myvacations" element={<MyVacations />} />
        <Route exact path="/signin" element={<SignInPage />} />
        <Route exact path="/signup" element={<SignupPage />} />
        
        <Route exact path="/chatHistory/:userstaycationid" element={<Chat />} />
      </Routes>
      <ToastContainer />
      {/* <Chat messages={messages} /> */}
    </div>
  );
}

export default App;
