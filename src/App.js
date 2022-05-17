import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SignupComp } from "./components/signup.component";
import { LoginComp } from "./components/login.component";
import { MainComponent } from "./components/authenticatedView/main.component";
import { NewScreen } from "./components/authenticatedView/addReading.component";
import React from "react";

function App() {
  const user = localStorage.getItem("token");
  const [verify, setVerify] = React.useState(false);

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
        if(data.message === "success") {
          setVerify(true);
        }
        else {
          setVerify(false);
        }
      });
  };

  if (user) {
    verifyUser();
  }

  return (
    <BrowserRouter>
      <Routes>
        {user && verify && (
          <>
            <Route path="/" element={<MainComponent />} />
            <Route path="/login" element={<Navigate to="/" />} />
            <Route path="/signup" element={<Navigate to="/" />} />
            <Route path="/addNewReading" element={<NewScreen />} />
          </>
        )}
        <Route path="/login" exact element={<LoginComp />} />
        <Route path="/signup" exact element={<SignupComp />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
