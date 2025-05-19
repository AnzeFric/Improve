package com.anzefric.improve.service.user;

import org.springframework.stereotype.Service;

import com.anzefric.improve.data.model.user.User;
import com.anzefric.improve.repository.user.UserRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;

    public void deactivateUser(User user) {
        user.setEnabled(false);
        userRepository.save(user);
    }
}
