package com.anzefric.improve.service;

import org.springframework.stereotype.Service;

import com.anzefric.improve.data.model.user.User;
import com.anzefric.improve.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;

    public void deleteUserByEmail(String userEmail) {
        User foundUser = userRepository.findByEmailIgnoreCase(userEmail);
        userRepository.delete(foundUser);
    }
}
