package com.project.user.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.project.user.dto.LoginRequest;
import com.project.user.dto.ResponseData;
import com.project.user.service.LoginService;

@RestController
@RequestMapping("/api")
public class LoginController {
    private static final Logger logger = LoggerFactory.getLogger(LoginController.class);

    private final LoginService loginService;
    public LoginController(LoginService loginService) {
        this.loginService = loginService;
    }
    
    @PostMapping("/login")
    public ResponseData login(@RequestBody LoginRequest request) {
        return loginService.login(request);
    }

}
