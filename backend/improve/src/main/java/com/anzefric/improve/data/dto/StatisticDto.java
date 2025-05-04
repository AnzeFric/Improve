package com.anzefric.improve.data.dto;

import com.anzefric.improve.data.model.util.Timeline;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class StatisticDto {
    private String workoutName;
    private String exerciseName;
    private Timeline timeline;
}
