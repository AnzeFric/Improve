package com.anzefric.improve.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.anzefric.improve.data.dto.api.ApiResponse;
import com.anzefric.improve.data.dto.api.ApiResponseException;
import com.anzefric.improve.data.model.user.User;
import com.anzefric.improve.data.model.workout.Workout;
import com.anzefric.improve.service.workout.WorkoutService;
import com.anzefric.improve.util.SecurityUtils;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("api/workout")
public class WorkoutController {
 
    private final WorkoutService workoutService;

    @GetMapping("/")
    public ApiResponse<Workout> getLatestWorkout() {
        try {
            User authenticatedUser = SecurityUtils.getCurrentAuthenticatedUser();
            Workout latestWorkout = workoutService.findLatestByUser(authenticatedUser);

            return ApiResponse.success(latestWorkout);
        } catch (RuntimeException e) {
            throw new ApiResponseException(HttpStatus.BAD_REQUEST, "Error fetching latest workout: " + e.getMessage());
        }
    }
    
    @PostMapping("/create")
    public ApiResponse<String> createWorkout(@RequestBody Workout workout) {
        try {
            User authenticatedUser = SecurityUtils.getCurrentAuthenticatedUser();
            workout.setUser(authenticatedUser);        
            workoutService.create(workout);

            return ApiResponse.success("Workout created successfully!");
        } catch (RuntimeException e) {
            throw new ApiResponseException(HttpStatus.BAD_REQUEST, "Error saving workout: " + e.getMessage());
        }
    }
}
