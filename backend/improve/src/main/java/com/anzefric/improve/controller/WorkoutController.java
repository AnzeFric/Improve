package com.anzefric.improve.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.anzefric.improve.data.model.user.User;
import com.anzefric.improve.data.model.workout.Workout;
import com.anzefric.improve.data.response.ApiResponse;
import com.anzefric.improve.data.response.ApiResponseException;
import com.anzefric.improve.service.WorkoutService;

@RestController
@RequestMapping("api/workout")
public class WorkoutController {
 
    @Autowired
    private WorkoutService workoutService;

    @PostMapping("/create")
    public ApiResponse<String> createWorkout(@RequestBody Workout workout) {
        try {
            User authenticatedUser = getCurrentAuthenticatedUser();
            workout.setUserUuid(authenticatedUser.getUserUuid());
            workoutService.create(workout);

            return ApiResponse.success("Workout created successfully!");
        } catch (RuntimeException e) {
            throw new ApiResponseException(HttpStatus.BAD_REQUEST, "Error saving workout: " + e.getMessage());
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
