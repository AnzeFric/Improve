package com.anzefric.improve.service.user;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.anzefric.improve.data.model.user.User;
import com.anzefric.improve.repository.user.UserRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;

    // TODO: don't delete. Only update as inactive, as email is a sensitive piece of data as per GDPR
    @Transactional
    public void deleteByEmail(String userEmail) {
        User foundUser = userRepository.findByEmailIgnoreCase(userEmail);
        userRepository.delete(foundUser);
    }
}
