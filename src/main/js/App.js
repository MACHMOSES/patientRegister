import React, { Component, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import {createRoot} from 'react-dom/client'
import axios from "axios";


const App = ()=> {
    const [patients, setPatients] = useState([])
    useEffect(()=>{
       const getPatient = ()=>{
        axios.get('/patient/all')
        .then(
            response => setPatients(response.data)
        );
        
       } 
       getPatient();

       const addPateient = (user) =>{
            axios.get('/patient/save', patient)
            .then( 
                response => setPatients(
                    [...patients, response.data]
                )
            );
       }
       addPateient();

       const removePatient = () =>{
        axios.delete('/user/${id}')
        .then(
            patients.filter(
                (patient) => patient.id !== id
            )
        );
       }


    },[])
        return (
            <div>
                <h1>Welcome to React Front End Served by Spring Boot</h1>
            </div>
        );
    }

export default App;

const root = createRoot( document.getElementById('root'));
 root.render(<App/>)