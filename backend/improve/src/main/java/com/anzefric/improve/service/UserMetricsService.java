package com.anzefric.improve.service;

import com.anzefric.improve.data.model.user.UserMetrics;
import com.anzefric.improve.repository.UserMetricsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UserMetricsService {

    @Autowired
    private UserMetricsRepository userMetricsRepository;

    public UserMetrics create(UserMetrics userMetrics) {
        // Check if the user already has metrics
        Optional<UserMetrics> foundUserMetrics = userMetricsRepository.getUserMetricsByUserId(userMetrics.getUserId());
        if (foundUserMetrics.isPresent()) {
            throw new RuntimeException("Metrics for this user already exists!");
        }
        return userMetricsRepository.save(userMetrics);
    }

    public UserMetrics getUserMetricsByUserId(String userId) {
        // Check if the user has a metrics
        Optional<UserMetrics> foundUserMetrics = userMetricsRepository.getUserMetricsByUserId(userId);
        if (!foundUserMetrics.isPresent()) {
            throw new RuntimeException("Metrics for this user do not exist!");
        }
        return foundUserMetrics.get();
    }  
    
    public void deleteUserMetrics(String userId) {
        // Check if the user has a metrics
        Optional<UserMetrics> foundUserMetrics = userMetricsRepository.getUserMetricsByUserId(userId);
        if(!foundUserMetrics.isPresent()) {
            throw new RuntimeException("Metrics for this user do not exist!");
        }
        userMetricsRepository.delete(foundUserMetrics.get());
    }
}
