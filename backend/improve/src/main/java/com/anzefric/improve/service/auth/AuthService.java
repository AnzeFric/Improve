package com.anzefric.improve.service;

import com.anzefric.improve.data.model.user.User;
import com.anzefric.improve.repository.AuthRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class AuthService {

    @Autowired
    private AuthRepository authRepository;

    public User register(User user) {
        if (authRepository.findByEmailIgnoreCase(user.getEmail()).isPresent()) {
            throw new RuntimeException("User with this email already exists");
        }
        
        return authRepository.save(user);
    }
    
    public User login(String email, String password) {
        Optional<User> userOptional = authRepository.findByEmailIgnoreCase(email);
        
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            
            if (user.getPassword().equals(password)) {
                return user;
            } else {
                throw new RuntimeException("Invalid password");
            }
        } else {
            throw new RuntimeException("User not found");
        }
    }

    public void deleteUser(UUID userUuid) {
        if (!authRepository.existsByUserUuid(userUuid)) {
            throw new RuntimeException("User not found, with uuid: " + userUuid);
        }
        authRepository.existsByUserUuid(userUuid);
    }
}