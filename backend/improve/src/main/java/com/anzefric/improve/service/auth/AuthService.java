package com.anzefric.improve.service.auth;

import com.anzefric.improve.data.dto.LoginUserDto;
import com.anzefric.improve.data.dto.RegisterUserDto;
import com.anzefric.improve.data.model.user.User;
import com.anzefric.improve.repository.AuthRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private AuthRepository authRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    
    public User register(RegisterUserDto input) {
        if (authRepository.findByEmailIgnoreCase(input.getEmail()).isPresent()) {
            throw new RuntimeException("User with this email already exists");
        }

        User user = new User();
        user.setFirstName(input.getFirstName());
        user.setLastName(input.getLastName());
        user.setEmail(input.getEmail());
        user.setPassword(passwordEncoder.encode(input.getPassword()));
        user.setDayStreak(0);

        return authRepository.save(user);
    }

    public User login(LoginUserDto input) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        input.getEmail(),
                        input.getPassword()
                )
        );

        return authRepository.findByEmailIgnoreCase(input.getEmail())
                .orElseThrow();
    }
}
