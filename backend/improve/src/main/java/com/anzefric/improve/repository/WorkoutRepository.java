package com.anzefric.improve.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.anzefric.improve.data.model.workout.Workout;
import java.util.UUID;

public interface WorkoutRepository extends JpaRepository<Workout, Long> {
    Optional<Workout> getWorkoutsByUserUuid(UUID userUuid);
}
