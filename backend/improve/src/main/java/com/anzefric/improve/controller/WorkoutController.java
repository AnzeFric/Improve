package com.anzefric.improve.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.anzefric.improve.data.model.workout.Workout;
import com.anzefric.improve.service.WorkoutService;

@RestController
@RequestMapping("api/workout")
public class WorkoutController {
 
    @Autowired
    private WorkoutService workoutService;

    @PostMapping("/create")
    public ResponseEntity<Workout> create(@RequestBody Workout workout) {
        try {
            Workout createdWorkout = workoutService.create(workout);
            return ResponseEntity.ok(createdWorkout);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }
}
