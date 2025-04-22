package com.anzefric.improve.service;

import org.springframework.stereotype.Service;

import com.anzefric.improve.data.model.workout.Workout;
import com.anzefric.improve.repository.WorkoutRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class WorkoutService {

    private final WorkoutRepository workoutRepository;

    public void create(Workout workout) {
        workoutRepository.save(workout);
    }
}
