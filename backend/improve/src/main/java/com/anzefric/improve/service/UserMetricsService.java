package com.anzefric.improve.service;

import com.anzefric.improve.data.model.user.UserMetrics;
import com.anzefric.improve.repository.UserMetricsRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import java.util.Optional;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class UserMetricsService {

    private final UserMetricsRepository userMetricsRepository;

    public UserMetrics createUserMetrics(UserMetrics userMetrics) {
        Optional<UserMetrics> existingMetrics = userMetricsRepository.getUserMetricsByUserUuid(userMetrics.getUserUuid());
        if(existingMetrics.isPresent()) {
            throw new RuntimeException("Metrics for this user already exist! Use update instead.");
        }
        return userMetricsRepository.save(userMetrics);
    }

    public UserMetrics getUserMetricsByUserUuid(UUID userUuid) {
        Optional<UserMetrics> existingMetrics = getExistingUserMetrics(userUuid);
        return existingMetrics.get();
    }  
    
    public void deleteUserMetricsByUserUuid(UUID userUuid) {
        Optional<UserMetrics> existingMetrics = getExistingUserMetrics(userUuid);
        userMetricsRepository.delete(existingMetrics.get());
    }

    public void updateUserMetrics(UserMetrics newUserMetrics) {
        UUID userUuid = newUserMetrics.getUserUuid();
        getExistingUserMetrics(userUuid);
        userMetricsRepository.updateUserMetricsByUserUuid(userUuid, newUserMetrics);
    }

    private Optional<UserMetrics> getExistingUserMetrics(UUID userUuid) {
        Optional<UserMetrics> existingMetrics = userMetricsRepository.getUserMetricsByUserUuid(userUuid);
        if(!existingMetrics.isPresent()) {
            throw new RuntimeException("Metrics for this user do not exist!");
        }
        return existingMetrics;
    }
}
