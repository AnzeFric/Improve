package com.anzefric.improve.repository.workout;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.anzefric.improve.data.model.user.User;
import com.anzefric.improve.data.model.workout.Exercise;

@Repository
public interface ExerciseRepository extends JpaRepository<Exercise, Long> {
    @Query("SELECT e FROM Exercise e WHERE e.workout.user = :user")
    List<Exercise> findAllByUser(@Param("user") User user);

    @Query("SELECT e FROM Exercise e WHERE e.workout.user = :user AND e.workout.date BETWEEN :start AND :end")
    List<Exercise> findByUserAndWorkoutDateBetween(
        @Param("user") User user,
        @Param("start") Date start,
        @Param("end") Date end
    );
}
