package com.anzefric.improve.service.workout;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.anzefric.improve.data.model.user.User;
import com.anzefric.improve.data.model.workout.Exercise;
import com.anzefric.improve.repository.workout.ExerciseRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class ExerciseService {
    
    private final ExerciseRepository exerciseRepository;

    public List<Exercise> getUserExercisesByDateRange(User user, Date start, Date end) {
        return exerciseRepository.findByUserAndWorkoutDateBetween(user, start, end);
    }

    public List<Exercise> getUserSpecificExercisesByDateRange(User user, String exerciseName, Date start, Date end) {
        List<Exercise> exercises = exerciseRepository.findByUserAndWorkoutDateBetween(user, start, end);

        // Find the specific exercises
        return exercises.stream()
            .filter(exercise -> exercise.getName().equalsIgnoreCase(exerciseName))
            .collect(Collectors.toList()); 
    }

    public Date getOldestExerciseDateByUser(User user) {
        return exerciseRepository.findEarliestWorkoutDateByUser(user);
    }

    public Date getNewestExerciseDateByUser(User user) {
        return exerciseRepository.findLatestWorkoutDateByUser(user);
    }
    
    public List<String> getUniqueExerciseNamesByUser(User user) {
        return exerciseRepository.findDistinctExerciseNamesByUserId(user);
    }
}
