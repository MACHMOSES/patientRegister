package com.patientRegister.patientRegister;

import org.springframework.boot.SpringApplication;

public class TestPatientRegisterApplication {

	public static void main(String[] args) {
		SpringApplication.from(PatientRegisterApplication::main).with(TestcontainersConfiguration.class).run(args);
	}

}
