package com.anzefric.improve.data.dto.auth;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class LoginResponse {
    private String token;
    private Long expiresIn;
    private Date issued;
}
