package com.anzefric.improve.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.anzefric.improve.data.model.user.User;
import com.anzefric.improve.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public void deleteUserByEmail(String userEmail) {
        User foundUser = userRepository.findByEmailIgnoreCase(userEmail);
        userRepository.delete(foundUser);
    }
}
