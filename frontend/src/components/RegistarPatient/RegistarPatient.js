import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import InputComponent from '../InputComponent/InputComponent';

const RegistarPatient = ({addPatient}) =>{
    const [patient, setPatient] = useState({
        
        gender:"",
        date:"",
        phoneNumber:"",
        idServiceNo:"",
        fullName:"",
        purpose:"",
        comment:"",
        followUp:""
    })
    
        const handleInputChange = (e) =>{
            const {name, value} = e.target
            setPatient({
                ...patient, 
                [name] : value,
        })
        }

        const onSubmit = (e) =>{
            e.preventDefault();
            addPatient(patient)
            setPatient({
                gender:"",
                date:"",
                phoneNumber:"",
                idServiceNo:"",
                fullName:"",
                purpose:"",
                comment:"",
                followUp:""
            })
        }
    

    return(
        <div className='container'>
            <form onSubmit={onSubmit}>
                <div></div>
                <InputComponent label ="gender">
                    <input
                    type = "radio"
                    name = "gender"
                    value="MALE"
                    checked ={patient.gender === "MALE"}
                    onChange={handleInputChange}
                    />
                    <input
                    type = "radio"
                    name = "gender"
                    value="FEMALE"
                    checked ={patient.gender === "FEMALE"}
                    onChange={handleInputChange}
                    />
                </InputComponent>
                <InputComponent label = "date">
                    <input
                    type = "date"
                    name = "date"
                    value={patient['date']}
                    onChange={handleInputChange}
                    />
                </InputComponent>
                <InputComponent label= "phoneNumber">
                    <input
                    type = "tel"
                    name = "phoneNumber"
                    value={patient['phoneNumber']}
                    onChange={handleInputChange}
                    />
                </InputComponent>
                <InputComponent label = "idServiceNo">
                    <input
                    type = "tel"
                    name = "idServiceNo"
                    value={patient['idServiceNo']}
                    onChange={handleInputChange}
                    />
                </InputComponent>
                <InputComponent label ="fullName">
                    <input
                    type = "text"
                    name = "fullName"
                    value={patient['fullName']}
                    placeholder='type your name'
                    onChange={handleInputChange}
                    />
                </InputComponent>
                <InputComponent label = "purpose">
                    <textarea
                        name = "purpose"
                        value = {patient['purpose']}
                        placeholder="Enter patient notes here..."
                        onChange={handleInputChange}
                    />
                </InputComponent>
                <InputComponent label = "comment">
                    <textarea
                        name = "comment"
                        value = {patient['comment']}
                        placeholder="Enter patient progress here..."
                        onChange={handleInputChange}
                    />
                </InputComponent>
                <InputComponent label= "followUp">
                    <textarea
                        name = "followUp"
                        value = {patient['followUp']}
                        placeholder="Enter what to followup on patirnt progress here..."
                        onChange={handleInputChange}
                    />
                </InputComponent>
                <button type='submit'>submit</button>
            </form>

        </div>

    );

}

export default RegistarPatient;