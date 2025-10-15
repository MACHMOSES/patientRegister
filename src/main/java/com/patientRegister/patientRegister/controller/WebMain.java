package com.patientRegister.patientRegister.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
public class WebMain {
    @RequestMapping(value = "/")
    public String index() {
        return "forward:/index.html";
    }
    
    
}
