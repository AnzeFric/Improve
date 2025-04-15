package com.anzefric.improve.controller;

import com.anzefric.improve.data.model.user.User;
import com.anzefric.improve.data.model.user.UserMetrics;
import com.anzefric.improve.data.response.ApiResponse;
import com.anzefric.improve.data.response.ApiResponseException;
import com.anzefric.improve.service.UserMetricsService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RequiredArgsConstructor
@RestController
@RequestMapping("api/user-metrics")
public class UserMetricsController {
    
    private final UserMetricsService userMetricsService;

    @PostMapping("/create")
    public ApiResponse<String> createUserMetrics(@RequestBody @Valid UserMetrics userMetrics) {
        try {
            User authenticatedUser = getCurrentAuthenticatedUser();
            userMetrics.setUserUuid(authenticatedUser.getUserUuid());
            userMetricsService.createUserMetrics(userMetrics);

            return ApiResponse.success("User metrics saved successfully.");
        } catch (Exception e) {
            throw new ApiResponseException(HttpStatus.BAD_REQUEST, "Error saving user metrics: " + e.getMessage());
        }
    }

    @GetMapping("/")
    public ApiResponse<UserMetrics> getUserMetrics() {
        try {
            User authenticatedUser = getCurrentAuthenticatedUser();
            UserMetrics userMetrics = userMetricsService.getUserMetricsByUserUuid(authenticatedUser.getUserUuid());

            return ApiResponse.success(userMetrics);
        } catch (Exception e) {
            throw new ApiResponseException(HttpStatus.BAD_REQUEST, "Error fetching user metrics: " + e.getMessage());
        }
    }

    @DeleteMapping("/delete")
    public ApiResponse<String> deleteUserMetrics() {
        try {
            User authenticatedUser = getCurrentAuthenticatedUser();
            userMetricsService.deleteUserMetricsByUserUuid(authenticatedUser.getUserUuid());

            return ApiResponse.success("User metrics deleted successfully.");
        } catch (Exception e) {
            throw new ApiResponseException(HttpStatus.BAD_REQUEST, "Error deleting user metrics: " + e.getMessage());
        }
    }

    @PutMapping("/update")
    public ApiResponse<String> updateUserMetrics(@RequestBody @Valid UserMetrics newUserMetrics) {
        try {
            User authenticatedUser = getCurrentAuthenticatedUser();
            newUserMetrics.setUserUuid(authenticatedUser.getUserUuid());
            userMetricsService.updateUserMetrics(newUserMetrics);

            return ApiResponse.success("User metrics updated successfully.");
        } catch (Exception e) {
            throw new ApiResponseException(HttpStatus.BAD_REQUEST, "Error updating user metrics: " + e.getMessage());
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
