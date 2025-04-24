package com.anzefric.improve.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.anzefric.improve.data.dto.StreakDto;
import com.anzefric.improve.data.model.Streak;
import com.anzefric.improve.data.model.user.User;
import com.anzefric.improve.data.response.ApiResponse;
import com.anzefric.improve.data.response.ApiResponseException;
import com.anzefric.improve.service.StreakService;
import com.anzefric.improve.util.SecurityUtils;

import lombok.RequiredArgsConstructor;

import java.util.Date;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/streak")
public class StreakController {
    
    private final StreakService streakService;

    @GetMapping("/")
    public ApiResponse<Streak> getCurrentStreak() {
        try {
            User authenticatedUser = SecurityUtils.getCurrentAuthenticatedUser();
            Streak currentStreak = streakService.findByUser(authenticatedUser);

            return ApiResponse.success(currentStreak);
        } catch (Exception e) {
            throw new ApiResponseException(HttpStatus.BAD_REQUEST, "Error fetching split: " + e.getMessage());
        }
    }

    @PostMapping("/update")
    public ApiResponse<String> updateStreak(@RequestBody StreakDto input) {
        try {
            User authenticatedUser = SecurityUtils.getCurrentAuthenticatedUser();
            Date startStreak = input.getStartStreak();
            Date lastCheckIn = input.getLastCheckIn();
    
            streakService.updateStreakByUser(authenticatedUser, startStreak, lastCheckIn);
    
            return ApiResponse.success("Streak updated successfully");
        } catch (Exception e) {
            throw new ApiResponseException(HttpStatus.BAD_REQUEST, "Error updating streak: " + e.getMessage());
        }
    }

    @PostMapping("/reset")
    public ApiResponse<String> resetStreak() {
        try {
            User authenticatedUser = SecurityUtils.getCurrentAuthenticatedUser();
            streakService.resetStreakByUser(authenticatedUser);

            return ApiResponse.success("Streak was reset successfully");
        } catch (Exception e) {
            throw new ApiResponseException(HttpStatus.BAD_REQUEST, "Error reseting streak: " + e.getMessage());
        }
    }   
}
