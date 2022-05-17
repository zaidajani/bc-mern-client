import React, { useState, useEffect, useRef } from "react";
import { Navbar } from "../comp/navbar.component";
import axios from "axios";
import "./../../styles/add.css";
import { useNavigate } from "react-router-dom";
import lottie from "lottie-web";
import styled from "styled-components";
import tick from "./../../static/tick.json";

const TickHolder = styled.div`
  height: 200px;
  width: 200px;
`;

export const NewScreen = () => {
  const [userData, setUserData] = useState("");
  const [userName, setUserName] = useState("");
  const [type, setType] = useState("");
  const [level, setLevel] = useState("");
  const [done, setDone] = useState(false);
  const navigate = useNavigate();

  const user = localStorage.getItem("token");
  const [verify, setVerify] = React.useState(false);

  useEffect(() => {
    const verifyUser = async () => {
      fetch("http://localhost:4000/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token"),
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message === "success") {
            setVerify(true);
          } else {
            localStorage.removeItem("token");
            navigate("/login");
          }
        });
    };
    verifyUser();
    async function getUserData() {
      let url = "http://localhost:4000/user/userdata";

      const user = await axios.get(url, {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      });

      setUserData(user.data);
      setUserName(user.data.username[0].toUpperCase());
    }
    getUserData();
  });

  const handleSubmit = async () => {
    let url = "http://localhost:4000/user/new-reading";

    if (!type || !level) {
      return alert("Please fill in all fields");
    }

    axios.post(
      url,
      {
        type,
        level,
      },
      {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      }
    );

    setDone(true);

    setTimeout(() => {
      navigate("/");
      window.location.href = "/";
    }, 2000);
  };

  return (
    <>
      <Navbar name={userName.charAt(0)} />
      {done ? (
        <>
          <div className="container">
            <div className="branding">
              <p>Done adding it to the DB.</p>
            </div>
          </div>
        </>
      ) : (
        <div className="container">
          <div className="branding">
            <p>Add New Reading</p>
          </div>
          <input
            className="inputTextTwo"
            placeholder="Pre or Post meal?"
            onChange={(e) => setType(e.target.value)}
          />
          <input
            className="inputTextTwo"
            placeholder="Sugar level (mg dl)"
            onChange={(e) => setLevel(e.target.value)}
          />
          <div className="button" onClick={handleSubmit}>
            <p>Add reading</p>
          </div>
        </div>
      )}
    </>
  );
};
