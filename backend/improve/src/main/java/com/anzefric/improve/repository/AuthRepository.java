package com.anzefric.improve.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.anzefric.improve.data.model.user.User;
import java.util.UUID;

public interface AuthRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmailIgnoreCase(String email);
    Boolean existsByUserUuid(UUID userUuid);
}
