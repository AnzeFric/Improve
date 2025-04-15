package com.anzefric.improve.service;

import com.anzefric.improve.data.model.user.User;
import com.anzefric.improve.data.model.user.UserMetrics;
import com.anzefric.improve.repository.UserMetricsRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class UserMetricsService {

    private final UserMetricsRepository userMetricsRepository;

    @Transactional
    public UserMetrics create(UserMetrics userMetrics) {
        Optional<UserMetrics> existingMetrics = userMetricsRepository.findByUser(userMetrics.getUser());
        if(existingMetrics.isPresent()) {
            throw new RuntimeException("Metrics for this user already exist! Use update instead.");
        }
        return userMetricsRepository.save(userMetrics);
    }

    public UserMetrics getByUser(User user) {
        Optional<UserMetrics> existingMetrics = getExistingUserMetrics(user);
        return existingMetrics.get();
    }  

    @Transactional
    public void deleteByUser(User user) {
        Optional<UserMetrics> existingMetrics = getExistingUserMetrics(user);
        userMetricsRepository.delete(existingMetrics.get());
    }

    @Transactional
    public void update(UserMetrics newUserMetrics) {
        User user = newUserMetrics.getUser();
        getExistingUserMetrics(user);
        userMetricsRepository.updateUserMetricsByUserUuid(user.getUserUuid(), newUserMetrics);
    }

    private Optional<UserMetrics> getExistingUserMetrics(User user) {
        Optional<UserMetrics> existingMetrics = userMetricsRepository.findByUser(user);
        if(!existingMetrics.isPresent()) {
            throw new RuntimeException("Metrics for this user do not exist!");
        }
        return existingMetrics;
    }
}
