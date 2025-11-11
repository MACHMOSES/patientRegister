package com.patientRegister.patientRegister.controller;
import com.patientRegister.patientRegister.models.Patient;
import com.patientRegister.patientRegister.models.User;
import com.patientRegister.patientRegister.config.JwtProvider;
import com.patientRegister.patientRegister.exceptions.ResourceNotFoundException;
import com.patientRegister.patientRegister.repositories.PatientRepository;
import com.patientRegister.patientRegister.repositories.UserRepository;
import com.patientRegister.patientRegister.response.AuthResponse;
import com.patientRegister.patientRegister.services.UserServiceImplementation;
import org.springframework.security.core.Authentication;
import java.util.Optional;
import java.util.List;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
public class PatientController {
    private PatientRepository patientRepository;
    @Autowired
    private final UserRepository userRepository;
    @Autowired
    private final PasswordEncoder passwordEncoder;
    @Autowired
    private UserServiceImplementation customUserDetails;
    @Autowired
    private AuthenticationManager authenticationManager;
    
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
                
                patient.setFullName(newPatient.getFullName());

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

    // @PostMapping("/register")
    // public ResponseEntity<User> registerUser(@RequestBody User user) {
       
    //     user.setPassword(passwordEncoder.encode(user.getPassword()));
    //     userRepository.save(user);
        
    //     return ResponseEntity.ok(user);
    // }

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> createUserHandler(@RequestBody User user)  {
        String email = user.getEmail();
        String password = user.getPassword();
        String fullName = user.getFullName();
        String role = user.getRole();

        Optional<User> isEmailExist = userRepository.findByEmail(email);
        
        if (isEmailExist.isPresent()) {
        
             throw new RuntimeException("Email is already used");
        }
    
        User createdUser = new User();
        createdUser.setEmail(email);
        createdUser.setFullName(fullName);
        createdUser.setRole(role);
        createdUser.setPassword(passwordEncoder.encode(password));
        
        // User savedUser = 
        userRepository.save(createdUser);
        // userRepository.save(savedUser);
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email,password));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = JwtProvider.generateToken(authentication);


        AuthResponse authResponse = new AuthResponse();
        authResponse.setJwt(token);
        authResponse.setMessage("Register Success");
        authResponse.setStatus(true);
        return new ResponseEntity<AuthResponse>(authResponse, HttpStatus.OK);

    }

    
    @PostMapping("/signin")
    public ResponseEntity<AuthResponse> signin(@RequestBody User loginRequest) {
        String email = loginRequest.getEmail();
        String password = loginRequest.getPassword();

        System.out.println(email+"-------"+password);

        Authentication authentication = authenticate(email, password);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = JwtProvider.generateToken(authentication);
        AuthResponse authResponse = new AuthResponse();

        authResponse.setMessage("Login success");
        authResponse.setJwt(token);
        authResponse.setStatus(true);

        return new ResponseEntity<>(authResponse,HttpStatus.OK);
    }



    
    private Authentication authenticate(String email, String password) {

        System.out.println(email+"---++----"+password);

        UserDetails userDetails = customUserDetails.loadUserByUsername(email);

        System.out.println("Sig in in user details"+ userDetails);

        if(userDetails == null) {
            System.out.println("Sign in details - null" + userDetails);

            throw new BadCredentialsException("Invalid username and password");
        }
        if(!passwordEncoder.matches(password,userDetails.getPassword())) {
            System.out.println("Sign in userDetails - password mismatch"+userDetails);

            throw new BadCredentialsException("Invalid password");

        }
        return new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());

    }

    
    




}
    


