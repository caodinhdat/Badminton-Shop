package com.project.user.service;

import java.util.Set;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.project.user.dto.RegisterRequest;
import com.project.user.dto.ResponseData;
import com.project.user.entity.Role;
import com.project.user.entity.User;
import com.project.user.repository.RoleRepository;
import com.project.user.repository.UserRepository;

@Service
public class RegisterService {
    private static final Logger logger = LoggerFactory.getLogger(RegisterService.class);
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    public RegisterService(UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public ResponseData<User> register(RegisterRequest request) {

        if (userRepository.existsByUsername(request.getUsername())) {
            return ResponseData.error("Username already exists", 400, "Registration failed");
        }
        if (userRepository.existsByEmail(request.getEmail())) {
            return ResponseData.error("Email already exists", 400, "Registration failed");
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        Role userRole = roleRepository.findByName("user")
                .orElseThrow(() -> new RuntimeException("User Role not found"));
        user.setRoles(Set.of(userRole));

        userRepository.save(user);
        logger.info("User registered successfully");
        return ResponseData.success(user, "User registered successfully");
    }
}