package com.anzefric.improve.data.dto;

import java.util.Date;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class StreakDto {
    private Date startStreak;
    private Date lastCheckIn;
}
