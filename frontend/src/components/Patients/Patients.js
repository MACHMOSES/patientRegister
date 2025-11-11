import React from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import PatientInformation from '../PatientInformation/PatientInformation';

const Patients = ({getPatient, removePatient, patients}) => {
    return(
    <div>
        {
            patients.map((patient)=>{
                return(<PatientInformation patient = {patient} removePatient = {removePatient} key={patient.id}/>);
            })
        }
    </div>);
}

export default Patients;