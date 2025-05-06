package com.anzefric.improve.data.dto.statistic;

import java.util.List;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class OptionsResponse {
    private List<String> workoutOptions;
    private List<String> exerciseOptions;
}
