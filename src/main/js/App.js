import React, { Component, useState, useEffect } from "react";
import ReactDOM from "react-dom";
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

const App = ()=> {
    const [patients, setPatients] = useState([])
    const [users, setUsers] = useState([])
    
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

       const handleLogin = async () => {
            try {
                const response = await axios.post("http://localhost:8081/auth/signin", {
                email: username,
                password: password
                });
                console.log("Login successful", response.data);
                localStorage.setItem("token", response.data.jwt);
            } catch (error) {
                console.error("Login failed", error);
            }
        };


    
        return (
            <div>
                <h1>Welcome to React Front End Served by Spring Boot</h1>
                <LoginComponent/>
                <SingUpComponent/>
                <DashboardWelcome user= {user}/>
                <RegistarPatient addPatient={addPatient}/>
                <Patients getPatient={getPatient} patients={patients} removePatient={removePatient}/>
            </div>
        );
    }

export default App;

const root = createRoot( document.getElementById('root'));
 root.render(<App/>)