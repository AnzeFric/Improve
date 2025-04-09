package com.anzefric.improve.controller;

import com.anzefric.improve.data.dto.LoginUserDto;
import com.anzefric.improve.data.dto.RegisterUserDto;
import com.anzefric.improve.data.model.user.User;
import com.anzefric.improve.data.response.LoginResponse;
import com.anzefric.improve.service.auth.AuthService;
import com.anzefric.improve.service.auth.JwtService;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private JwtService jwtService;
    

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody @Valid RegisterUserDto registerUserDto) {
        try {
            User registeredUser = authService.register(registerUserDto);
            return ResponseEntity.ok(registeredUser);
        } catch(Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> authenticate(@RequestBody LoginUserDto loginUserDto) {
        try {
            User authenticatedUser = authService.login(loginUserDto);

            String jwtToken = jwtService.generateToken(authenticatedUser);

            LoginResponse loginResponse = new LoginResponse();
            loginResponse.setToken(jwtToken);
            loginResponse.setExpiresIn(jwtService.getExpirationTime());

            return ResponseEntity.ok(loginResponse);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, e.getMessage());

        }
    }
}