import React, { Component, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {createRoot} from 'react-dom/client'
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './main.css';
import Patients from "../../../frontend/src/components/Patients/Patients";
import RegistarPatient from "../../../frontend/src/components/RegistarPatient/RegistarPatient";
import SingUpComponent from "../../../frontend/src/components/SignUpComponent/SignUpComponent";
import LoginComponent from "../../../frontend/src/components/LoginComponent.js/LoginComponent";
import DashboardWelcome from "../../../frontend/src/components/Dashboard/DashboardWelcome";
import NavComponent from "../../../frontend/src/components/NavComponent/NavComponent";

const App = ()=> {
    const [patients, setPatients] = useState([])
    const [users, setUsers] = useState([])
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

        const handleLoginSuccess = (token) => {
            localStorage.setItem("token", token);
            setIsLoggedIn(true);
            };

        const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        };
    
       const getPatient = ()=>{
        axios.get('/patient/all')
        .then(
            response => setPatients(response.data)
        );
        
       } 
       

       const addPatient = (patient) =>{
            axios.post('/patient/save', patient)
            .then( 
                response => setPatients(
                    [...patients, response.data]
                )
            );
       }
       

       const removePatient = (id) =>{
        axios.delete(`/patient/${id}`)
        .then(
            setPatients((prevPatients) => prevPatients.filter((patient) => patient.id !== id))
        );
       }
    
        return (
            <div>
                <NavComponent/>
            
                {!isLoggedIn ? (
                            <>
                                <div id='login'></div><LoginComponent onLoginSuccess={handleLoginSuccess} /></div>
                                <div id='signup'></div><SingUpComponent /></div>
                                <div id='logout'></div>

                            </>
                            ) : (
                            <>
                                <DashboardWelcome />
                                <RegistarPatient addPatient={addPatient} />
                                <Patients getPatient={getPatient} patients={patients} removePatient={removePatient} />
                            </>
                 )}
                {/* <DashboardWelcome/>
                <RegistarPatient addPatient={addPatient}/>
                <Patients getPatient={getPatient} patients={patients} removePatient={removePatient}/> */}
            </div>
        );
    }

export default App;

const root = createRoot( document.getElementById('root'));
 root.render(<App/>)