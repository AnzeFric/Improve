package com.anzefric.improve.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.anzefric.improve.data.model.user.UserMetrics;
import java.util.UUID;

public interface UserMetricsRepository extends JpaRepository<UserMetrics, Long> {
    Optional<UserMetrics> getUserMetricsByUserUuid(UUID userUuid);
}
