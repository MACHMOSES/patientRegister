package com.patientRegister.patientRegister.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.security.core.GrantedAuthority;

import com.patientRegister.patientRegister.repositories.UserRepository;
import com.patientRegister.patientRegister.models.User;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserServiceImplementation implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    public UserServiceImplementation(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    @Override
    public  UserDetails loadUserByUsername(String email) throws UsernameNotFoundException{
        User user = userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
        System.out.println(user);
        if(user==null){
            throw new UsernameNotFoundException("user not found with this email"+email);
        }

        System.out.println("Loaded user:" + user.getEmail() + ", Role:" + user.getRole());
        List<GrantedAuthority> authority = new ArrayList<>();
        return new org.springframework.security.core.userdetails.User(
            user.getEmail(),
            user.getPassword(),
            authority

        );
    }
}
