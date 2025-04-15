package com.anzefric.improve.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.anzefric.improve.data.model.Split;
import com.anzefric.improve.data.model.user.User;

@Repository
public interface SplitRepository extends JpaRepository<Split, Long> {
    Split findByUser(User user);
}
