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
        <div className="border rounded-lg p-4"
        style={{ width: "500px", height: "auto" }}>
            <div className="d-flex align-items-center flex-wrap gap-3">
                <p className="mb-0">ID:{id}</p>
                <p className="mb-0">Gender:{gender}</p>
                <p className="mb-0" >Date:{date}</p>
                <p className="mb-0">PhoneNumber:{phoneNumber}</p>
                <p className="mb-0">IdServiceNo:{idServiceNo}</p>
                <p className="mb-0" >FullName:{fullName}</p>
                <p className="mb-0">Purpose:{purpose}</p>
                <p className="mb-0">Comment:{comment}</p>
                <p className="mb-0">FollowUp:{followUp}</p>
                <button onClick={(e)=>{deletePatient(id)}} className="btn btn-danger btn-sm">delete</button>
            </div>
        </div>
    </div>);
}

export default PatientInformation;