package com.patientRegister.patientRegister.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "patient")
public class Patient {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String gender;
    private String date;
    private String phoneNumber;
    private String idServiceNo;
    private String fullName;
    private String purpose;
    private String comment;
    private String followUp;

    // --- GETTERS ---

    public Long getId() {
        return id;
    }

    public String getGender() {
        return gender;
    }

    public String getDate() {
        return date;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public String getIdServiceNo() {
        return idServiceNo;
    }

    public String getFullName() {
        return fullName;
    }

    public String getPurpose() {
        return purpose;
    }

    public String getComment() {
        return comment;
    }

    public String getFollowUp() {
        return followUp;
    }

    // --- SETTERS ---

    public void setId(Long id) {
        this.id = id;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public void setIdServiceNo(String idServiceNo) {
        this.idServiceNo = idServiceNo;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public void setPurpose(String purpose) {
        this.purpose = purpose;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public void setFollowUp(String followUp) {
        this.followUp = followUp;
    }
}
