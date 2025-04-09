package com.anzefric.improve.controller;

import com.anzefric.improve.data.dto.UserDto;
import com.anzefric.improve.data.response.ApiResponse;
import com.anzefric.improve.data.response.ApiResponseException;
import com.anzefric.improve.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/")
    public ApiResponse<UserDto> getCurrentUser() {
        try {
            UserDto currentUser = getCurrentAuthenticatedUser();
            return ApiResponse.success(currentUser);
        } catch (Exception e) {
            throw new ApiResponseException(HttpStatus.BAD_REQUEST, "Error fetching user data: " + e.getMessage());
        }
    }
    
    @DeleteMapping("/delete")
    public ApiResponse<String> delete() {
        try {
            UserDto currentUser = getCurrentAuthenticatedUser();
            userService.deleteUser(currentUser);
            return ApiResponse.success("User deleted successfully.");
        } catch (Exception e) {
            throw new ApiResponseException(HttpStatus.BAD_REQUEST, "Error deleting user: " + e.getMessage());
        }
    }  
    
    private UserDto getCurrentAuthenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new ApiResponseException(HttpStatus.FORBIDDEN, "User not authenticated.");
        }
        return (UserDto) authentication.getPrincipal();
    }
}
