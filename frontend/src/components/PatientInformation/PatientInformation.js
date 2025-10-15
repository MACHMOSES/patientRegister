import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React from 'react';

const PatientInformation = ({patient, removePatient}) =>{
    const {id,gender,date, phoneNumber, idServiceNo, fullName, purpose, comment, followUp
    } = patient

    const deletePatient = (id) =>{
        removePatient(id)
    }
    return(
    <div>
        <div>
            <p>ID:{id}</p>
            <p>Gender:{gender}</p>
            <p>Date:{date}</p>
            <p>PhoneNumber:{phoneNumber}</p>
            <p>IdServiceNo:{idServiceNo}</p>
            <p>FullName:{fullName}</p>
            <p>Purpose:{purpose}</p>
            <p>Comment:{comment}</p>
            <p>FollowUp:{followUp}</p>
            <button onClick={(e)=>{deletePatient(id)}}>delete</button>
        </div>

    </div>);
}

export default PatientInformation;