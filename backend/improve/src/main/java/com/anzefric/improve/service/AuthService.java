package com.anzefric.improve.service;

import com.anzefric.improve.model.User;
import com.anzefric.improve.repository.AuthRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private AuthRepository authRepository;

    public User register(User user) {
        // Check if user already exists
        if (authRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("User with this email already exists");
        }
        
        return authRepository.save(user);
    }
    
    public User login(String email, String password) {
        Optional<User> userOptional = authRepository.findByEmail(email);
        
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            
            // String comparison for password
            if (user.getPassword().equals(password)) {
                return user;
            } else {
                throw new RuntimeException("Invalid password");
            }
        } else {
            throw new RuntimeException("User not found");
        }
    }

    public void deleteUser(String id) {
        if (!authRepository.existsById(id)) {
            throw new RuntimeException("User not found with id: " + id);
        }
        authRepository.deleteById(id);
    }
}