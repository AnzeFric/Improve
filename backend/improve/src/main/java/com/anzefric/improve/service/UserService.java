package com.anzefric.improve.service;


import org.springframework.stereotype.Service;

import com.anzefric.improve.data.model.user.User;
import com.anzefric.improve.repository.UserRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> allUsers() {
        List<User> users = new ArrayList<>();

        userRepository.findAll().forEach(users::add);

        return users;
    }

    public void deleteUser(User user) {
        UUID uuid = user.getUserUuid();
        if (!userRepository.existsByUserUuid(uuid)) {
            throw new RuntimeException("User not found, with uuid: " + uuid);
        }
        userRepository.delete(user);
    }
}
