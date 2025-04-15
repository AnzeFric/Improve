package com.anzefric.improve.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.anzefric.improve.data.model.workout.Workout;
import com.anzefric.improve.data.response.ApiResponse;
import com.anzefric.improve.data.response.ApiResponseException;
import com.anzefric.improve.service.WorkoutService;
import com.anzefric.improve.util.SecurityUtils;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("api/workout")
public class WorkoutController {
 
    private final WorkoutService workoutService;

    @PostMapping("/create")
    public ApiResponse<String> createWorkout(@RequestBody Workout workout) {
        try {
            SecurityUtils.getCurrentAuthenticatedUser();
            workoutService.create(workout);

            return ApiResponse.success("Workout created successfully!");
        } catch (RuntimeException e) {
            throw new ApiResponseException(HttpStatus.BAD_REQUEST, "Error saving workout: " + e.getMessage());
        }
    }
}
