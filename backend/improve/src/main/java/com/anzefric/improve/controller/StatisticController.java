package com.anzefric.improve.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.anzefric.improve.data.model.user.User;
import com.anzefric.improve.data.model.util.Timeline;
import com.anzefric.improve.data.model.workout.Exercise;
import com.anzefric.improve.data.model.workout.Workout;
import com.anzefric.improve.data.response.ApiResponse;
import com.anzefric.improve.data.response.ApiResponseException;
import com.anzefric.improve.service.StatisticService;
import com.anzefric.improve.util.SecurityUtils;

import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/statistic")
public class StatisticController {
    
    private final StatisticService statisticService;

    // Returns array of workouts from the authenticated user by the timeline
    @GetMapping("/workout")
    public ApiResponse<List<Workout>> getAllWorkoutsByUser(@RequestBody Timeline input) {
        try {
            User authenticatedUser = SecurityUtils.getCurrentAuthenticatedUser();
            List<Workout> workouts = statisticService.getWorkoutsByUser(authenticatedUser, input);
            return ApiResponse.success(workouts);
        } catch (Exception e) {
            throw new ApiResponseException(HttpStatus.BAD_REQUEST, "Error fetching user workouts: " + e.getMessage());
        }
    }

    // Returns array of exercises from the authenticated user by the timeline
    @GetMapping("/exercise")
    public ApiResponse<List<Exercise>> getAllExercisessByUser(@RequestBody Timeline input) {
        try {
            User authenticatedUser = SecurityUtils.getCurrentAuthenticatedUser();
            List<Exercise> exercises = statisticService.getExercisesByUser(authenticatedUser, input);
            return ApiResponse.success(exercises);
        } catch (Exception e) {
            throw new ApiResponseException(HttpStatus.BAD_REQUEST, "Error fetching user exercises: " + e.getMessage());
        }
    }
}
