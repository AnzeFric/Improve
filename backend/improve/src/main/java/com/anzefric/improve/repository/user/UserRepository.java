package com.anzefric.improve.repository.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.anzefric.improve.data.model.user.User;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmailIgnoreCase(String email);
    User findByUserUuid(UUID userUuid);
}
