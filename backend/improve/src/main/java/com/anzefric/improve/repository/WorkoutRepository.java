package com.anzefric.improve.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.anzefric.improve.model.workout.Workout;

import java.util.Optional;

public interface WorkoutRepository extends MongoRepository<Workout, String> {
    Optional<Workout> getWorkoutsByUserId(String userId);
}
