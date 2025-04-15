package com.anzefric.improve.controller;

import com.anzefric.improve.data.dto.LoginUserDto;
import com.anzefric.improve.data.dto.RegisterUserDto;
import com.anzefric.improve.data.model.user.User;
import com.anzefric.improve.data.response.ApiResponse;
import com.anzefric.improve.data.response.ApiResponseException;
import com.anzefric.improve.data.response.LoginResponse;
import com.anzefric.improve.service.auth.AuthService;
import com.anzefric.improve.service.auth.JwtService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
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

    @PostMapping("/login")
    public ApiResponse<?> login(@RequestBody LoginUserDto loginUserDto) {
        try {
            User authenticatedUser = authService.login(loginUserDto);

            String jwtToken = jwtService.generateToken(authenticatedUser);

            LoginResponse loginResponse = new LoginResponse();
            loginResponse.setToken(jwtToken);
            loginResponse.setExpiresIn(jwtService.getExpirationTime());
            
            return ApiResponse.success(loginResponse);
        } catch (Exception e) {
            throw new ApiResponseException(HttpStatus.BAD_REQUEST, "Login failed: " + e.getMessage());
        }
    }
}
