package com.anzefric.improve.controller;

import com.anzefric.improve.data.model.user.User;
import com.anzefric.improve.data.response.ApiResponse;
import com.anzefric.improve.data.response.ApiResponseException;
import com.anzefric.improve.service.UserService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    @GetMapping("/")
    public ApiResponse<User> getUser() {
        try {
            User currentUser = getCurrentAuthenticatedUser();

            return ApiResponse.success(currentUser);
        } catch (Exception e) {
            throw new ApiResponseException(HttpStatus.BAD_REQUEST, "Error fetching user data: " + e.getMessage());
        }
    }
    
    @DeleteMapping("/delete")
    public ApiResponse<String> deleteUser() {
        try {
            User currentUser = getCurrentAuthenticatedUser();
            userService.deleteUserByEmail(currentUser.getEmail());

            return ApiResponse.success("User deleted successfully.");
        } catch (Exception e) {
            throw new ApiResponseException(HttpStatus.BAD_REQUEST, "Error deleting user: " + e.getMessage());
        }
    }  
    
    private User getCurrentAuthenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new ApiResponseException(HttpStatus.FORBIDDEN, "User not authenticated.");
        }
        return (User) authentication.getPrincipal();
    }
}
