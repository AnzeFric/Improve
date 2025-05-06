package com.anzefric.improve.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.anzefric.improve.data.dto.api.ApiResponse;
import com.anzefric.improve.data.dto.api.ApiResponseException;
import com.anzefric.improve.data.model.Split;
import com.anzefric.improve.data.model.user.User;
import com.anzefric.improve.service.SplitService;
import com.anzefric.improve.util.SecurityUtils;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/split")
public class SplitController {
    
    private final SplitService splitService;

    @GetMapping("/")
    public ApiResponse<Split> getSplit() {
        try {
            User authenticatedUser = SecurityUtils.getCurrentAuthenticatedUser();
            Split split = splitService.getByUser(authenticatedUser);
            return ApiResponse.success(split);
        } catch (Exception e) {
            throw new ApiResponseException(HttpStatus.BAD_REQUEST, "Error fetching split: " + e.getMessage());
        }
    }
}
