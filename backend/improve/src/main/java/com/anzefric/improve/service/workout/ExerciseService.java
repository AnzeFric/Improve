package com.anzefric.improve.service.workout;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.anzefric.improve.data.model.user.User;
import com.anzefric.improve.data.model.util.Timeline;
import com.anzefric.improve.data.model.workout.Exercise;
import com.anzefric.improve.repository.workout.ExerciseRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class ExerciseService {
    
    private final ExerciseRepository exerciseRepository;

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
    
    public List<Exercise> getSpecificExercisesByName(User user, String exerciseName, Timeline timeline) {
        List<Exercise> exercises = getExercisesByUser(user, timeline);
        
        // Find the specific exercises
        return exercises.stream()
            .filter(exercise -> exercise.getName().equalsIgnoreCase(exerciseName))
            .collect(Collectors.toList());
    }

    public List<String> getUniqueExerciseNamesByUser(User user) {
        return exerciseRepository.findDistinctExerciseNamesByUserId(user);
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
