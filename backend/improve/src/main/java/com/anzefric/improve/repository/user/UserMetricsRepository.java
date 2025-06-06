package com.anzefric.improve.repository.user;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.anzefric.improve.data.model.user.User;
import com.anzefric.improve.data.model.user.UserMetrics;


@Repository
public interface UserMetricsRepository extends JpaRepository<UserMetrics, Long> {
    Optional<UserMetrics> findByUser(User user);

    @Modifying
    @Transactional
    @Query("UPDATE UserMetrics u SET u.age = :#{#userMetrics.age}, u.weight = :#{#userMetrics.weight}, u.height = :#{#userMetrics.height} WHERE u.user = :user")
    void updateUserMetricsByUserUuid(User user, UserMetrics userMetrics);
}
