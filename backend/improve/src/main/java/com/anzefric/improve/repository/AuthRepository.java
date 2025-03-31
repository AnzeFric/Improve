package com.anzefric.improve.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.anzefric.improve.model.user.User;

import java.util.Optional;

public interface AuthRepository extends MongoRepository<User, String> {
    Optional<User> findByEmail(String email);
}
