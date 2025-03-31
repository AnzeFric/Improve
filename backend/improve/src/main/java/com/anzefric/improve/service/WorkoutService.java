package com.anzefric.improve.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.anzefric.improve.model.workout.Workout;
import com.anzefric.improve.repository.WorkoutRepository;

@Service
public class WorkoutService {

    @Autowired
    private WorkoutRepository workoutRepository;

    public Workout create(Workout workout) {
        return workoutRepository.save(workout);
    }
}
