package com.anzefric.improve.data.dto;

import com.anzefric.improve.data.model.workout.Exercise;

import lombok.Getter;
import lombok.ToString;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Getter
@ToString
public class WorkoutDto {
    private String name;
    private UUID userUuid;
    private Date date;
    private List<Exercise> exercises;
}
