package com.anzefric.improve.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.anzefric.improve.data.dto.statistic.OptionsResponse;
import com.anzefric.improve.data.dto.statistic.StatisticResponse;
import com.anzefric.improve.data.model.user.User;
import com.anzefric.improve.data.model.util.Timeline;
import com.anzefric.improve.service.workout.ExerciseService;
import com.anzefric.improve.service.workout.WorkoutService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class StatisticService {
    
    private final ExerciseService exerciseService;

    private final WorkoutService workoutService;

    // TODO
    public StatisticResponse getOverallTimelineDataByUser(User user, Timeline timeline) {
        StatisticResponse timelineData = new StatisticResponse();

        
        return timelineData;
    }

    // TODO
    public StatisticResponse getExerciseTimelineDataByUser(User user, String exerciseName, Timeline timeline) {
        StatisticResponse data = new StatisticResponse();

        return data;
    }

    // TODO
    public StatisticResponse getWorkoutTimelineDataByUser(User user, String workoutName, Timeline timeline) {
        StatisticResponse data = new StatisticResponse();

        return data;
    }

    @Transactional
    public OptionsResponse getWorkoutExerciseOptions(User user) {
        List<String> workoutOptions = workoutService.getUniqueWorkoutNamesByUser(user);
        List<String> exerciseOptions = exerciseService.getUniqueExerciseNamesByUser(user);

        OptionsResponse options = new OptionsResponse();
        options.setWorkoutOptions(workoutOptions);
        options.setExerciseOptions(exerciseOptions);

        return options;
    }
}
