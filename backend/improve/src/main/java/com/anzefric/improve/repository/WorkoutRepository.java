package com.anzefric.improve.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.anzefric.improve.data.model.workout.Workout;

public interface WorkoutRepository extends JpaRepository<Workout, Long> {
    Optional<Workout> getWorkoutsByUserUuid(String userUuid);
}
