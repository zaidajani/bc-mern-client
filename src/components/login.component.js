import React, { useState } from "react";
import "./../styles/signup.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Navigate, Link } from "react-router-dom";

export const LoginComp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogIn = async () => {
    if (!email || !password) {
      setError("Please fill in all fields");
    }
    try {
      const url = "https://blood-pressure-api.herokuapp.com/auth";
      const data = await axios.post(url, {
        email,
        password,
      });
      localStorage.setItem("token", data.data.token);
      window.location.href = "/";
    } catch (error) {
      setError(error.response.data);
    }
  };

  return (
    <div className="bodyClass">
    <div className="elementHolder">
      <div className="signupBranding">
        <p>Login</p>
      </div>
      <div className="form">
        {error && (
          <div className="error">
            <p>{error}</p>
          </div>
        )}
        <div className="spacer" />
        <input
          type="text"
          onChange={(event) => setEmail(event.target.value)}
          className="inputText"
          placeholder="Email"
        />
        <div className="spacer" />
        <input
          type="password"
          onChange={(event) => setPassword(event.target.value)}
          className="inputText"
          placeholder="Password"
        />
        <div className="spacer" />
        <div className="createUserButton" onClick={handleLogIn}>
          <p>Sign In</p>
        </div>
      </div>
      <div className="spacer" />
      <div className="logintxt">
        <p>
          New user? <Link to="/signup">Sign up.</Link>
        </p>
      </div>
      <ToastContainer />
    </div>
    </div>
  );
};
