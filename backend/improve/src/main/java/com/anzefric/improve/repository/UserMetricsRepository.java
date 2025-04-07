package com.anzefric.improve.repository;

import java.util.Optional;

import com.anzefric.improve.data.model.user.UserMetrics;

public interface UserMetricsRepository {
    Optional<UserMetrics> getUserMetricsByUserId(String userId);
}
