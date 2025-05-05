package com.anzefric.improve.service;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.anzefric.improve.data.model.user.User;
import com.anzefric.improve.data.model.util.Timeline;
import com.anzefric.improve.data.model.workout.Exercise;
import com.anzefric.improve.data.model.workout.Set;
import com.anzefric.improve.data.model.workout.Workout;
import com.anzefric.improve.repository.workout.WorkoutRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class WorkoutService {

    private final WorkoutRepository workoutRepository;

    // Mozno poenostavit?
    public void create(Workout workout) {
        if (workout.getExercises() != null) {
            for (Exercise exercise : workout.getExercises()) {
                exercise.setWorkout(workout);

                if(exercise.getSets() != null) {
                    for(Set set : exercise.getSets()) {
                        set.setExercise(exercise);
                    }
                }
            }
        }

        workoutRepository.save(workout);
    }

    public Workout findLatestByUser(User user) {
        return workoutRepository.findTopByUserOrderByDateDesc(user);
    }

    public List<Workout> getWorkoutsByUser(User user, Timeline timeline) {
        Date[] range = getDateRange(timeline);

        List<Workout> workouts;
        if (range == null) {
            workouts = workoutRepository.findAllByUser(user);
        } else {
            workouts = workoutRepository.findAllByUserAndDateBetween(user, range[0], range[1]);
        }

        return workouts;
    }

    public List<Workout> getSpecificWorkoutByName(User user, String workoutName, Timeline timeline) {
        List<Workout> workouts = getWorkoutsByUser(user, timeline);
        
        // Find the specific workouts
        return workouts.stream()
            .filter(workout -> workout.getName().equalsIgnoreCase(workoutName))
            .collect(Collectors.toList());
    }

    
    private Date[] getDateRange(Timeline timeline) {
        if (timeline == Timeline.All) {
            return null;
        }

        Date now = new Date();
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(now);

        switch (timeline) {
            case Month:
                calendar.add(Calendar.MONTH, -1);
                break;
            case Year:
                calendar.add(Calendar.YEAR, -1);
                break;
            case All: // Case already handled. Only added to remove warning
                break;
        }

        Date[] dateTuple = {calendar.getTime(), now};
        return dateTuple;
    }
}
