package com.patientRegister.patientRegister.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name ="users")
@NoArgsConstructor
@AllArgsConstructor
public class User {
   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY) 
    private long id;
    private String fullName;
    private String username;
    private String email;
    private String password;
    private String confirmPassword;
    private String role;

    public Long getId(){
        return id;
    }

    public void setId( Long id){
        this.id = id;
    }

    public String getFullName(){
        return fullName;
    }

    public void setFullName( String fullName){
        this.fullName = fullName;
    }

    public String getUsername(){
        return username;
    }

    public void setUsername( String username){
        this.username = username;
    }

    public String getEmail(){
        return email;
    }

    public void setEmail( String email){
        this.email = email;
    }

    public String getPassword(){
        return password;
    }

    public void setPassword( String password){
        this.password = password;
    }

    public String getRole(){
        return role;
    }

    public void setRole( String role){
        this.role = role;
    }

     public String getConfirmPassword(){
        return confirmPassword;
    }

    public void setConfirmPassword( String confirmPassword){
        this.confirmPassword = confirmPassword;
    }
}
