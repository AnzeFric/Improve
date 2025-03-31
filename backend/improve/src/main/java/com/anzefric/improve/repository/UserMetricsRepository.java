package com.anzefric.improve.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.anzefric.improve.model.user.UserMetrics;

import java.util.Optional;

public interface UserMetricsRepository extends MongoRepository<UserMetrics, String> {
    Optional<UserMetrics> getUserMetricsByUserId(String userId);
}
