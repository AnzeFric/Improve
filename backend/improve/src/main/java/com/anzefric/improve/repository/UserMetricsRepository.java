package com.anzefric.improve.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.anzefric.improve.data.model.user.UserMetrics;


import java.util.UUID;

@Repository
public interface UserMetricsRepository extends JpaRepository<UserMetrics, Long> {
    Optional<UserMetrics> getUserMetricsByUserUuid(UUID userUuid);

    @Modifying
    @Transactional
    @Query("UPDATE UserMetrics u SET u.age = :#{#userMetrics.age}, u.weight = :#{#userMetrics.weight}, u.height = :#{#userMetrics.height} WHERE u.userUuid = :userUuid")
    void updateUserMetricsByUserUuid(UUID userUuid, UserMetrics userMetrics);
}
