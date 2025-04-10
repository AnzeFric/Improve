package com.anzefric.improve.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.anzefric.improve.data.model.user.User;
import com.anzefric.improve.data.response.ApiResponseException;
import com.anzefric.improve.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public void deleteUserByEmail(String userEmail) {
        try {
            User foundUser = userRepository.findByEmailIgnoreCase(userEmail);
            userRepository.delete(foundUser);
        } catch(Exception e) {
            throw new ApiResponseException(HttpStatus.NOT_FOUND, "User not found.");
        }
    }
}
