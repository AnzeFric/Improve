package com.anzefric.improve.repository;

import java.util.Optional;

import com.anzefric.improve.data.model.workout.Workout;

public interface WorkoutRepository {
    Optional<Workout> getWorkoutsByUserId(String userId);
}
