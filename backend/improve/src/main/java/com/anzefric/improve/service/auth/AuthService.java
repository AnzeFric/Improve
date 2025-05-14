package com.anzefric.improve.service.auth;

import com.anzefric.improve.data.dto.api.ApiResponseException;
import com.anzefric.improve.data.dto.auth.LoginUserDto;
import com.anzefric.improve.data.dto.auth.RegisterUserDto;
import com.anzefric.improve.data.model.user.User;
import com.anzefric.improve.repository.user.UserRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class AuthService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;
    
    @Transactional
    public User register(RegisterUserDto input) {
        if (userRepository.findByEmailIgnoreCase(input.getEmail()).isPresent()) {
            throw new ApiResponseException(HttpStatus.BAD_REQUEST, "User with this email already exists");
        }

        User user = new User();
        user.setFirstName(input.getFirstName());
        user.setLastName(input.getLastName());
        user.setEmail(input.getEmail());
        user.setPassword(passwordEncoder.encode(input.getPassword()));
        
        return userRepository.save(user);
    }

    @Transactional
    public User login(LoginUserDto input) {
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                input.getEmail(),
                input.getPassword()
            )
        );

        return userRepository.findByEmailIgnoreCase(input.getEmail()).orElseThrow();
    }
}
