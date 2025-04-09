package com.anzefric.improve;

import com.anzefric.improve.data.response.ApiResponse;
import com.anzefric.improve.data.response.ApiResponseException;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.security.SignatureException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AccountStatusException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler({
        AccountStatusException.class,
        AccessDeniedException.class,
        SignatureException.class,
        ExpiredJwtException.class
    })
    public ResponseEntity<ApiResponse<String>> handleSecurityException(Exception exception) {
        exception.printStackTrace();
    
        String message = exception.getMessage();
        HttpStatus status = HttpStatus.FORBIDDEN;
        String description = "Security error";
    
        if (exception instanceof AccountStatusException) {
            description = "The account is locked";
        } else if (exception instanceof AccessDeniedException) {
            description = "You are not authorized to access this resource";
        } else if (exception instanceof SignatureException) {
            description = "The JWT signature is invalid";
        } else if (exception instanceof ExpiredJwtException) {
            description = "The JWT token has expired";
        } else {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
    
        String fullMessage = description + ": " + message;
        ApiResponse<String> response = ApiResponse.fail(fullMessage);
        
        return new ResponseEntity<>(response, status);
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
