package com.anzefric.improve.service;

import org.springframework.stereotype.Service;

import com.anzefric.improve.data.model.workout.Exercise;
import com.anzefric.improve.data.model.workout.Set;
import com.anzefric.improve.data.model.workout.Workout;
import com.anzefric.improve.repository.WorkoutRepository;

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
}
