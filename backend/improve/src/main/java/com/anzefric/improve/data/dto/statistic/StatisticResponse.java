package com.anzefric.improve.data.dto.statistic;

import java.util.Date;
import java.util.List;

import com.anzefric.improve.data.model.workout.Exercise;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class StatisticResponse {
    private List<TimelineData> list;

    @Getter
    @Setter
    @ToString
    public static class TimelineData {
        private List<Exercise> exercises;
        private Date dateTo;   
    }
}
