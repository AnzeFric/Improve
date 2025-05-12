package com.anzefric.improve.service.workout;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.PageRequest;
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

    public Date getNewestExerciseDateByUser(User user) {
        List<Date> results = exerciseRepository.findLatestWorkoutDateByUser(user, PageRequest.of(0, 1));
        return results.isEmpty() ? null : results.get(0);
    }
    
    public Date getOldestExerciseDateByUser(User user) {
        List<Date> results = exerciseRepository.findEarliestWorkoutDateByUser(user, PageRequest.of(0, 1));
        return results.isEmpty() ? null : results.get(0);
    }

    
    public List<String> getUniqueExerciseNamesByUser(User user) {
        return exerciseRepository.findDistinctExerciseNamesByUserId(user);
    }
}
