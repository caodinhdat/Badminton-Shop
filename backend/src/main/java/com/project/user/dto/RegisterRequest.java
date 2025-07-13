package com.project.user.dto;

public class RegisterRequest {
    
    public String username;
    public String email;
    public String password;

    public RegisterRequest() {
        // Default constructor
    }
    
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

    public void setEmail(String email) {
        this.email = email;
    }  

    public String getEmail() {
        return email;
    }
}
