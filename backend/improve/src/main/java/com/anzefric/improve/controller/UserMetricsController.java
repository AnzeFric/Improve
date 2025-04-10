package com.anzefric.improve.controller;

import com.anzefric.improve.data.model.user.User;
import com.anzefric.improve.data.model.user.UserMetrics;
import com.anzefric.improve.data.response.ApiResponse;
import com.anzefric.improve.data.response.ApiResponseException;
import com.anzefric.improve.service.UserMetricsService;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/user-metrics")
public class UserMetricsController {
    
    @Autowired
    private UserMetricsService userMetricsService;

    @PostMapping("/create")
    public ApiResponse<String> createUserMetrics(@RequestBody @Valid UserMetrics userMetrics) {
        try {
            User authenticatedUser = getCurrentAuthenticatedUser();
            userMetrics.setUserUuid(authenticatedUser.getUserUuid());
            userMetricsService.create(userMetrics);

            return ApiResponse.success("User metrics saved successfully.");
        } catch (Exception e) {
            throw new ApiResponseException(HttpStatus.BAD_REQUEST, "Error saving user metrics: " + e.getMessage());
        }
    }

    @GetMapping("/")
    public ApiResponse<UserMetrics> getUserMetrics() {
        try {
            User authenticatedUser = getCurrentAuthenticatedUser();
            UserMetrics userMetrics = userMetricsService.getUserMetricsByUserId(authenticatedUser.getUserUuid());

            return ApiResponse.success(userMetrics);
        } catch (Exception e) {
            throw new ApiResponseException(HttpStatus.BAD_REQUEST, "Error fetching user metrics: " + e.getMessage());
        }
    }

    @DeleteMapping("/delete")
    public ApiResponse<String> deleteUserMetrics() {
        try {
            User authenticatedUser = getCurrentAuthenticatedUser();
            userMetricsService.deleteUserMetrics(authenticatedUser.getUserUuid());

            return ApiResponse.success("User metrics deleted successfully.");
        } catch (RuntimeException e) {
            throw new ApiResponseException(HttpStatus.BAD_REQUEST, "Error deleting user metrics: " + e.getMessage());
        }
    }

    private User getCurrentAuthenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new ApiResponseException(HttpStatus.FORBIDDEN, "User not authenticated.");
        }
        return (User) authentication.getPrincipal();
    }
}
