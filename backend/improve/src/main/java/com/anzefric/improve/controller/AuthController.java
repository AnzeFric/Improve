package com.anzefric.improve.controller;

import com.anzefric.improve.data.dto.api.ApiResponse;
import com.anzefric.improve.data.dto.api.ApiResponseException;
import com.anzefric.improve.data.dto.auth.LoginResponse;
import com.anzefric.improve.data.dto.auth.LoginUserDto;
import com.anzefric.improve.data.dto.auth.RegisterUserDto;
import com.anzefric.improve.data.model.user.User;
import com.anzefric.improve.service.auth.AuthService;
import com.anzefric.improve.service.auth.JwtService;

import lombok.RequiredArgsConstructor;

import java.util.Date;

import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;
    
    private final JwtService jwtService;

    @PostMapping("/register")
    public ApiResponse<String> register(@RequestBody RegisterUserDto registerUserDto) {
        try {
            authService.register(registerUserDto);
            return ApiResponse.success("Registration successful!");
        } catch(Exception e) {
            throw new ApiResponseException(HttpStatus.BAD_REQUEST, "Registration failed: " + e.getMessage());
        }
    }

    @Transactional
    @PostMapping("/login")
    public ApiResponse<LoginResponse> login(@RequestBody LoginUserDto loginUserDto) {
        try {
            User authenticatedUser = authService.login(loginUserDto);

            String jwtToken = jwtService.generateToken(authenticatedUser);

            LoginResponse loginResponse = new LoginResponse();
            loginResponse.setToken(jwtToken);
            loginResponse.setExpiresIn(jwtService.getExpirationTime()); // 1 week in ms
            loginResponse.setIssued(new Date());
            
            return ApiResponse.success(loginResponse);
        } catch (Exception e) {
            throw new ApiResponseException(HttpStatus.BAD_REQUEST, "Login failed: " + e.getMessage());
        }
    }
}
