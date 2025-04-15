package com.anzefric.improve.util;

import com.anzefric.improve.data.model.user.User;
import com.anzefric.improve.data.response.ApiResponseException;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public class SecurityUtils {
    
    public static User getCurrentAuthenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new ApiResponseException(HttpStatus.FORBIDDEN, "User not authenticated.");
        }
        return (User) authentication.getPrincipal();
    }
}