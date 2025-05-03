package com.anzefric.improve.repository.workout;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.anzefric.improve.data.model.user.User;
import com.anzefric.improve.data.model.workout.Workout;

@Repository
public interface WorkoutRepository extends JpaRepository<Workout, Long> {
    Workout findByUser(User user);
    Workout findTopByUserOrderByDateDesc(User user);
    List<Workout> findAllByUser(User user);
    List<Workout> findAllByUserAndDateBetween(User user, Date start, Date end);
}
