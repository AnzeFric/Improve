package com.anzefric.improve.repository.user;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.anzefric.improve.data.model.user.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmailIgnoreCase(String email);

    // Using nativeQuery so that SQLRestriction can not influence this
    @Query(value = "SELECT * FROM users WHERE LOWER(email) = LOWER(:email)", nativeQuery = true) 
    User findByEmailIgnoreCaseIncludingDeleted(@Param("email") String email);
}
