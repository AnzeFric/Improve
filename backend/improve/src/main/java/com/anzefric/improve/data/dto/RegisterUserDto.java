package com.anzefric.improve.data.dto;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class RegisterUserDto {
    private String firstName;
    private String lastName;
    private String email;
    private String password;
}
