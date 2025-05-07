package com.anzefric.improve.repository.workout;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.anzefric.improve.data.model.user.User;
import com.anzefric.improve.data.model.workout.Workout;

@Repository
public interface WorkoutRepository extends JpaRepository<Workout, Long> {
    Workout findTopByUserOrderByDateDesc(User user);
    List<Workout> findAllByUser(User user);
    List<Workout> findAllByUserAndDateBetween(User user, Date start, Date end);
    
    @Query("SELECT DISTINCT w.name FROM Workout w WHERE w.user = :user")
    List<String> findDistinctWorkoutNamesByUserId(@Param("user") User user);
}
