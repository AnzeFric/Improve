package com.anzefric.improve.service;

import com.anzefric.improve.data.model.user.UserMetrics;
import com.anzefric.improve.repository.UserMetricsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserMetricsService {

    @Autowired
    private UserMetricsRepository userMetricsRepository;

    public UserMetrics create(UserMetrics userMetrics) {
        Optional<UserMetrics> foundUserMetrics = userMetricsRepository.getUserMetricsByUserUuid(userMetrics.getUserUuid());
        if (foundUserMetrics.isPresent()) {
            throw new RuntimeException("Metrics for this user already exists!");
        }
        return userMetricsRepository.save(userMetrics);
    }

    public UserMetrics getUserMetricsByUserId(UUID userUuid) {
        Optional<UserMetrics> foundUserMetrics = userMetricsRepository.getUserMetricsByUserUuid(userUuid);
        if (!foundUserMetrics.isPresent()) {
            throw new RuntimeException("Metrics for this user do not exist!");
        }
        return foundUserMetrics.get();
    }  
    
    public void deleteUserMetrics(UUID userUuid) {
        Optional<UserMetrics> foundUserMetrics = userMetricsRepository.getUserMetricsByUserUuid(userUuid);
        if(!foundUserMetrics.isPresent()) {
            throw new RuntimeException("Metrics for this user do not exist!");
        }
        userMetricsRepository.delete(foundUserMetrics.get());
    }
}
