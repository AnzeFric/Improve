package com.anzefric.improve.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.anzefric.improve.data.dto.StatisticDto;
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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/statistic")
public class StatisticController {
    
    private final StatisticService statisticService;

    // Returns an array of all workouts from the authenticated user by the timeline
    @PostMapping("/workout")
    public ApiResponse<List<Workout>> getAllWorkoutsByUser(@RequestBody Timeline input) {
        try {
            User authenticatedUser = SecurityUtils.getCurrentAuthenticatedUser();
            List<Workout> workouts = statisticService.getWorkoutsByUser(authenticatedUser, input);
            return ApiResponse.success(workouts);
        } catch (Exception e) {
            throw new ApiResponseException(HttpStatus.BAD_REQUEST, "Error fetching user workouts: " + e.getMessage());
        }
    }

    // Returns a specific workout by name from the authenticated user by the timeline
    @PostMapping("/workout/specific")
    public ApiResponse<List<Workout>> getSpecificWorkoutByName(@RequestBody StatisticDto input) {
        try {
            User authenticatedUser = SecurityUtils.getCurrentAuthenticatedUser();
            List<Workout> workout = statisticService.getSpecificWorkoutByName(
                authenticatedUser, 
                input.getWorkoutName(), 
                input.getTimeline()
            );
            return ApiResponse.success(workout);
        } catch (Exception e) {
            throw new ApiResponseException(HttpStatus.BAD_REQUEST, "Error fetching specific workout: " + e.getMessage());
        }
    }

    // Returns an array of all exercises from the authenticated user by the timeline
    @PostMapping("/exercise")
    public ApiResponse<List<Exercise>> getAllExercisesByUser(@RequestBody Timeline input) {
        try {
            User authenticatedUser = SecurityUtils.getCurrentAuthenticatedUser();
            List<Exercise> exercises = statisticService.getExercisesByUser(authenticatedUser, input);
            return ApiResponse.success(exercises);
        } catch (Exception e) {
            throw new ApiResponseException(HttpStatus.BAD_REQUEST, "Error fetching user exercises: " + e.getMessage());
        }
    }
    
    // Returns specific exercises by name from the authenticated user by the timeline
    @PostMapping("/exercise/specific")
    public ApiResponse<List<Exercise>> getSpecificExercisesByName(@RequestBody StatisticDto input) {
        try {
            User authenticatedUser = SecurityUtils.getCurrentAuthenticatedUser();
            List<Exercise> exercises = statisticService.getSpecificExercisesByName(
                authenticatedUser, 
                input.getExerciseName(), 
                input.getTimeline()
            );
            return ApiResponse.success(exercises);
        } catch (Exception e) {
            throw new ApiResponseException(HttpStatus.BAD_REQUEST, "Error fetching specific exercises: " + e.getMessage());
        }
    }
}
