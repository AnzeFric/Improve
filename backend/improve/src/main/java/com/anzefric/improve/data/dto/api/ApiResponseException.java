package com.anzefric.improve.data.dto.api;

import org.springframework.http.HttpStatus;

public class ApiResponseException extends RuntimeException {
    private final HttpStatus status;

    public ApiResponseException(HttpStatus status, String message) {
        super(message);
        this.status = status;
    }

    public HttpStatus getStatus() {
        return status;
    }
}
