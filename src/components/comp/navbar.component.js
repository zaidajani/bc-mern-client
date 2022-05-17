import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import "../../styles/nav.css";

export const Navbar = ({ name, username, firstName, lastName, age }) => {
  return (
    <>
      <nav>
        <div className="brand">
          <Link to="/">
            <p className="logo">Dashboard</p>
          </Link>
        </div>
        <ul>
          <div className="profile-alpha" onClick={() => {
            alert("username: " + username + "\n" + "firstName: " + firstName + "\n" + "lastName: " + lastName + "\n" + "age: " + age);
          }}>
            <h4>{name}</h4>
          </div>
          <div className="logout-button" onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/";
          }}>Log Out</div>
        </ul>
      </nav>
    </>
  );
};