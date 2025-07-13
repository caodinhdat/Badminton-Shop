package com.project.user.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.project.user.dto.RegisterRequest;
import com.project.user.dto.ResponseData;
import com.project.user.service.RegisterService;

@RestController
@RequestMapping("/api")
public class RegisterController {
    private static final Logger logger = LoggerFactory.getLogger(RegisterController.class);

    private final RegisterService registerService;
    public RegisterController(RegisterService registerService) {
        this.registerService = registerService;
    }
    
    @PostMapping("/register")
    public ResponseData register(@RequestBody RegisterRequest request) {
        return registerService.register(request);
    }

}
