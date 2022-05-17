import React, { useState } from "react";
import "./../styles/signup.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Navigate, Link, useNavigate } from "react-router-dom";

export const SignupComp = () => {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(true);
  const navigate = useNavigate();

  const [age, setAge] = useState("");
  const handleSignUp = () => {
    if (
      !username ||
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !repeatedPassword
    ) {
      setError("Please fill in all fields");
    }
    if (password !== repeatedPassword) {
      return setError("Passwords do not match");
    }
    try {
      const url = "http://localhost:4000/user/";
      axios.post(url, {
        username,
        firstName,
        lastName,
        email,
        password,
        age,
      });
    } catch (error) {
      setError(error.response.data.message);
    }
    navigate("/login");
  };

  return (
    <div className="bodyClass">
      <div className="elementHolder">
        <div className="signupBranding">
          <p>Sign Up Form</p>
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
            onChange={(event) => setUsername(event.target.value)}
            className="inputText"
            placeholder="Username"
          />
          <div className="spacer" />
          <input
            type="text"
            onChange={(event) => setFirstName(event.target.value)}
            className="inputText"
            placeholder="First Name"
          />
          <div className="spacer" />
          <input
            type="text"
            onChange={(event) => setLastName(event.target.value)}
            className="inputText"
            placeholder="Last Name"
          />
          <div className="spacer" />
          <input
            type="text"
            onChange={(event) => setEmail(event.target.value)}
            className="inputText"
            placeholder="email"
          />
          <div className="spacer" />
          <div className="passwordHolder">
            <input
              type="password"
              className="passwordInput"
              placeholder="password"
              onChange={(event) => setPassword(event.target.value)}
            />
            <input
              type="password"
              className="passwordInput"
              placeholder="confirm password"
              onChange={(event) => setRepeatedPassword(event.target.value)}
            />
          </div>
          <div className="spacer" />
          <input
            type="number"
            onChange={(event) => setAge(event.target.value)}
            className="inputText"
            placeholder="age"
          />
          <div className="spacer" />
          <div className="createUserButton" onClick={handleSignUp}>
            <p>Create account</p>
          </div>
        </div>
        <div className="spacer" />
        <div className="logintxt">
          <p>
            Already a user? <Link to="/login">Login.</Link>
          </p>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};
