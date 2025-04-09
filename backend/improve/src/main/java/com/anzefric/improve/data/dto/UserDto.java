package com.anzefric.improve.data.dto;

import java.util.UUID;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class UserDto {
    private UUID userUuid;
    private String firstName;
    private String lastName;
    private String email;
    private int dayStreak;
}
