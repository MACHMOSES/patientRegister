package com.patientRegister.patientRegister.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.patientRegister.patientRegister.models.Patient;

public interface PatientRepository extends JpaRepository<Patient, Long> {

    

    
}
