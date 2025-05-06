package com.anzefric.improve;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.security.SignatureException;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AccountStatusException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.anzefric.improve.data.dto.api.ApiResponse;
import com.anzefric.improve.data.dto.api.ApiResponseException;

@RestControllerAdvice
public class GlobalExceptionHandler {

    private static record ExceptionDetails(String description, HttpStatus status) {}

    private static final Map<Class<? extends Exception>, ExceptionDetails> exceptions = Map.of(
        AccountStatusException.class, new ExceptionDetails("The account is locked", HttpStatus.UNAUTHORIZED),
        AccessDeniedException.class, new ExceptionDetails("You are not authorized to access this resource", HttpStatus.FORBIDDEN),
        SignatureException.class, new ExceptionDetails("The JWT signature is invalid", HttpStatus.FORBIDDEN),
        ExpiredJwtException.class, new ExceptionDetails("The JWT token has expired", HttpStatus.FORBIDDEN)
    );

    @ExceptionHandler({
        AccountStatusException.class,
        AccessDeniedException.class,
        SignatureException.class,
        ExpiredJwtException.class
    })
    public ResponseEntity<ApiResponse<String>> handleSecurityException(Exception exception) {
        exception.printStackTrace();
        
        String message = exception.getMessage();
        
        ExceptionDetails details = exceptions.getOrDefault(
            exception.getClass(), 
            new ExceptionDetails("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR)
        );
        
        String fullMessage = details.description() + ": " + message;
        ApiResponse<String> response = ApiResponse.fail(fullMessage);
    
        return new ResponseEntity<>(response, details.status());
    }

    @ExceptionHandler(ApiResponseException.class)
    public ResponseEntity<ApiResponse<String>> handleApiResponseException(ApiResponseException exception) {        
        ApiResponse<String> response = ApiResponse.fail(exception.getMessage());
        HttpStatus status = exception.getStatus();

        return new ResponseEntity<>(response, status);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<String>> handleGeneralException(Exception exception) {
        exception.printStackTrace();

        String message = exception.getMessage();
        ApiResponse<String> response = ApiResponse.fail(message);
        HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;

        return new ResponseEntity<>(response, status);
    }
}
