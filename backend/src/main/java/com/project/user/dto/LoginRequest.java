package com.project.user.dto;

public class LoginRequest {
// DTO for user login requests
    public String username;
    public String password;
    
    // Getters and setters
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
    public LoginRequest() {
        // Default constructor
    }
}
