package com.anzefric.improve.service.workout;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.anzefric.improve.data.model.user.User;
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

    public List<Exercise> getUserSpecificExercisesByDateRange(User user, String workoutName, Date start, Date end) {
        List<Workout> workouts = workoutRepository.findAllByUserAndDateBetween(user, start, end);
    
        return workouts.stream()
            .filter(workout -> workout.getName().equalsIgnoreCase(workoutName))
            .flatMap(workout -> workout.getExercises().stream())
            .collect(Collectors.toList()); 
    }

    public List<String> getUniqueWorkoutNamesByUser(User user) {
        return workoutRepository.findDistinctWorkoutNamesByUserId(user);
    }
}
