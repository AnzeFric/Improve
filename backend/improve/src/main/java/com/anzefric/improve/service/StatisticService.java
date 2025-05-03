package com.anzefric.improve.service;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Service;

import com.anzefric.improve.data.model.user.User;
import com.anzefric.improve.data.model.util.Timeline;
import com.anzefric.improve.data.model.workout.Exercise;
import com.anzefric.improve.data.model.workout.Workout;
import com.anzefric.improve.repository.workout.ExerciseRepository;
import com.anzefric.improve.repository.workout.WorkoutRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class StatisticService {

    private final WorkoutRepository workoutRepository;

    private final ExerciseRepository exerciseRepository;

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

    public List<Exercise> getExercisesByUser(User user, Timeline timeline) {
        Date[] range = getDateRange(timeline);

        List<Exercise> exercises;
        if (range == null) {
            exercises = exerciseRepository.findAllByUser(user);
        } else {
            exercises = exerciseRepository.findByUserAndWorkoutDateBetween(user, range[0], range[1]);
        }

        return exercises;
    }

    private Date[] getDateRange(Timeline timeline) {
        if (timeline == Timeline.All) {
            return null;
        }

        Date now = new Date();
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(now);

        switch (timeline) {
            case Week:
                calendar.add(Calendar.DAY_OF_YEAR, -7);
                break;
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
