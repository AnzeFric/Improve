package com.anzefric.improve.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.anzefric.improve.data.model.Streak;
import com.anzefric.improve.data.model.user.User;

@Repository
public interface StreakRepository extends JpaRepository<Streak, Long> {
    Streak findByUser(User user); 
} 
