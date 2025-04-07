package com.anzefric.improve.repository;

import java.util.Optional;

import com.anzefric.improve.data.model.user.User;

public interface AuthRepository {
    Optional<User> findByEmail(String email);
}
