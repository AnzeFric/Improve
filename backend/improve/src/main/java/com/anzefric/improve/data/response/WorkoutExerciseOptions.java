package com.anzefric.improve.data.response;

import java.util.List;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class WorkoutExerciseOptions {
    private List<String> workoutOptions;
    private List<String> exerciseOptions;
}
