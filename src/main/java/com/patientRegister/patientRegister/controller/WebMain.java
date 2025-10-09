package com.patientRegister.patientRegister.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
public class WebMain {
    @RequestMapping(value = "/patient/details")
    public String index() {
        return "index";
    }
    
    
}
