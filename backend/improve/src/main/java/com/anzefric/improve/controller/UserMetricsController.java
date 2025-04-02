package com.anzefric.improve.controller;

import com.anzefric.improve.model.user.UserMetrics;
import com.anzefric.improve.service.UserMetricsService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("api/user-metrics")
public class UserMetricsController {
    
    @Autowired
    private UserMetricsService userMetricsService;

    @PostMapping("/create")
    public ResponseEntity<UserMetrics> create(@RequestBody UserMetrics userMetrics) {
        try {
            UserMetrics createdUserMetrics = userMetricsService.create(userMetrics);
            return ResponseEntity.ok(createdUserMetrics);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @GetMapping("/{userId}")
    public ResponseEntity<UserMetrics> getUserMetricsByUserId(@PathVariable String userId) {
        try {
            UserMetrics userMetrics = userMetricsService.getUserMetricsByUserId(userId);
            return ResponseEntity.ok(userMetrics);
        } catch (RuntimeException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    @DeleteMapping("/delete/{userId}")
    public ResponseEntity<String> deleteUserMetricsByUserId(@PathVariable String userId) {
        try {
            userMetricsService.deleteUserMetrics(userId);
            return ResponseEntity.ok("User metrics deleted successfully");
        } catch (RuntimeException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }
}
