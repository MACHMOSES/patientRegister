package com.patientRegister.patientRegister.controller;
import com.patientRegister.patientRegister.models.Patient;
import com.patientRegister.patientRegister.models.User;
import com.patientRegister.patientRegister.exceptions.ResourceNotFoundException;
import com.patientRegister.patientRegister.repositories.PatientRepository;
import com.patientRegister.patientRegister.repositories.UserRepository;

import java.util.List;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;



@RestController
public class PatientController {
    private PatientRepository patientRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    
    

    public PatientController(PatientRepository patientRepository, PasswordEncoder passwordEncoder, UserRepository userRepository) {
        this.patientRepository = patientRepository;
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
    }

    @PostMapping("/patient/save")
    public Patient savePatient(@RequestBody Patient patient) {
        return this.patientRepository.save(patient);
    }

    @GetMapping("/patient/all")
    public ResponseEntity<List<Patient>> getPatients() {
        return ResponseEntity.ok(
                this.patientRepository.findAll());
    }

    @GetMapping("/patient/{id}")
    public ResponseEntity<Patient> getPatient(@PathVariable(value = "id") Long id) {
        Patient patient = this.patientRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("patient not found"));
        return ResponseEntity.ok().body(patient);
    }

    @PutMapping("/patient/{id}")
    public Patient putPatient(@PathVariable (value = "id") Long id, @RequestBody Patient newPatient ) {
        
        return this.patientRepository.findById(id).map(
            patient ->{
                patient.setGender(newPatient.getGender());
                
                patient.setName(newPatient.getName());

                patient.setDate(newPatient.getDate());

                patient.setPhoneNumber(newPatient.getPhoneNumber());

                patient.setIdServiceNo(newPatient.getIdServiceNo());

                patient.setPurpose(newPatient.getPurpose());

                patient.setComment(newPatient.getComment());

                patient.setFollowUp(newPatient.getFollowUp());

                return this.patientRepository.save(patient);
}
        ).orElseGet(()->{
            newPatient.setId(id);
            return this.patientRepository.save(newPatient);
        });
    }

@DeleteMapping("/patient/{id}")
    public ResponseEntity<Void> removePatient(@PathVariable(value = "id") Long id){
        Patient patient = this.patientRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("user has not been seen"));
        this.patientRepository.delete(patient);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/login")
    public String login() {
        return "login"; //login.html
    }

    @GetMapping("/register")
    public String registerForm() {
        return "registar";//registaer.html
    }

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody User user) {
       
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        
        return ResponseEntity.ok(user);
    }

    @GetMapping("/welcome")
    public String welcome() {
        return "welcome"; //welcome.html
    }
    
    
    
    




}
    


