package com.anzefric.improve.data.response;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class LoginResponse {
    private String firstName;
    private String lastName;
    private int dayStreak;
    private String token;
    private Long expiresIn;
}
