package com.anzefric.improve.controller.user;

import com.anzefric.improve.data.model.user.User;
import com.anzefric.improve.data.model.user.UserMetrics;
import com.anzefric.improve.data.response.ApiResponse;
import com.anzefric.improve.data.response.ApiResponseException;
import com.anzefric.improve.service.user.UserMetricsService;
import com.anzefric.improve.util.SecurityUtils;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("api/user-metrics")
public class UserMetricsController {
    
    private final UserMetricsService userMetricsService;

    @PostMapping("/create")
    public ApiResponse<String> createUserMetrics(@RequestBody @Valid UserMetrics userMetrics) {
        try {
            User authenticatedUser = SecurityUtils.getCurrentAuthenticatedUser();
            userMetrics.setUser(authenticatedUser);
            userMetricsService.create(userMetrics);
            return ApiResponse.success("User metrics saved successfully.");
        } catch (Exception e) {
            throw new ApiResponseException(HttpStatus.BAD_REQUEST, "Error saving user metrics: " + e.getMessage());
        }
    }

    @GetMapping("/")
    public ApiResponse<UserMetrics> getUserMetrics() {
        try {
            User authenticatedUser = SecurityUtils.getCurrentAuthenticatedUser();
            UserMetrics userMetrics = userMetricsService.getByUser(authenticatedUser);
            return ApiResponse.success(userMetrics);
        } catch (Exception e) {
            throw new ApiResponseException(HttpStatus.BAD_REQUEST, "Error fetching user metrics: " + e.getMessage());
        }
    }

    @DeleteMapping("/delete")
    public ApiResponse<String> deleteUserMetrics() {
        try {
            User authenticatedUser = SecurityUtils.getCurrentAuthenticatedUser();
            userMetricsService.deleteByUser(authenticatedUser);
            return ApiResponse.success("User metrics deleted successfully.");
        } catch (Exception e) {
            throw new ApiResponseException(HttpStatus.BAD_REQUEST, "Error deleting user metrics: " + e.getMessage());
        }
    }

    @PutMapping("/update")
    public ApiResponse<String> updateUserMetrics(@RequestBody @Valid UserMetrics newUserMetrics) {
        try {
            User authenticatedUser = SecurityUtils.getCurrentAuthenticatedUser();
            newUserMetrics.setUser(authenticatedUser);
            userMetricsService.update(newUserMetrics);
            return ApiResponse.success("User metrics updated successfully.");
        } catch (Exception e) {
            throw new ApiResponseException(HttpStatus.BAD_REQUEST, "Error updating user metrics: " + e.getMessage());
        }
    }
}
