package com.anzefric.improve.data.dto.auth;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class LoginUserDto {
    private String email;
    private String password;
}
