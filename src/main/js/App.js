import React, { Component, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createRoot } from "react-dom/client";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./main.css";
import Patients from "../../../frontend/src/components/Patients/Patients";
import RegistarPatient from "../../../frontend/src/components/RegistarPatient/RegistarPatient";
import SignUpComponent from "../../../frontend/src/components/SignUpComponent/SignUpComponent";
import LoginComponent from "../../../frontend/src/components/LoginComponent.js/LoginComponent";
import DashboardWelcome from "../../../frontend/src/components/Dashboard/DashboardWelcome";
import NavComponent from "../../../frontend/src/components/NavComponent/NavComponent";

const App = () => {
  const [patients, setPatients] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [showSignup, setShowSignup] = useState(false);

  const handleLoginSuccess = (token) => {
    localStorage.setItem("token", token);
    setIsLoggedIn(token);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  const getPatient = () => {
    axios.get("/patient/all").then((response) => setPatients(response.data));
  };

  const addPatient = (patient) => {
    axios
      .post("/patient/save", patient)
      .then((response) => setPatients([...patients, response.data]));
  };

  const removePatient = (id) => {
    axios
      .delete(`/patient/${id}`)
      .then(
        setPatients((prevPatients) =>
          prevPatients.filter((patient) => patient.id !== id)
        )
      );
  };

  return (
    <div>
      <NavComponent />

      
     {!isLoggedIn ? (
        <>
          {showSignup ? (
            <div id="login">
                <LoginComponent
                    onLoginSuccess={handleLoginSuccess}
                    onShowSignup={() => setShowSignup(false)} // this is the key
                />
            </div>
            
            
          ) : (

            <div id="signup">
              <SignUpComponent onBackToLogin={() => setShowSignup(true)} onSignupSuccess={handleLoginSuccess} />
            </div>
          )}
        </>
      ) : (
        <>
          <DashboardWelcome />
          <RegistarPatient addPatient={addPatient} />
          <Patients
            getPatient={getPatient}
            patients={patients}
            removePatient={removePatient}
          />
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
      
    </div>
  );
};

export default App;

const root = createRoot(document.getElementById("root"));
root.render(<App />);
