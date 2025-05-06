package com.anzefric.improve.controller.user;

import com.anzefric.improve.data.dto.api.ApiResponse;
import com.anzefric.improve.data.dto.api.ApiResponseException;
import com.anzefric.improve.data.model.user.User;
import com.anzefric.improve.service.user.UserService;
import com.anzefric.improve.util.SecurityUtils;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    @GetMapping("/")
    public ApiResponse<User> getUser() {
        try {
            User authenticatedUser = SecurityUtils.getCurrentAuthenticatedUser();
            return ApiResponse.success(authenticatedUser);
        } catch (Exception e) {
            throw new ApiResponseException(HttpStatus.BAD_REQUEST, "Error fetching user data: " + e.getMessage());
        }
    }
    
    @DeleteMapping("/delete")
    public ApiResponse<String> deleteUser() {
        try {
            User authenticatedUser = SecurityUtils.getCurrentAuthenticatedUser();
            userService.deleteByEmail(authenticatedUser.getEmail());
            return ApiResponse.success("User deleted successfully.");
        } catch (Exception e) {
            throw new ApiResponseException(HttpStatus.BAD_REQUEST, "Error deleting user: " + e.getMessage());
        }
    }  
}
