package com.anzefric.improve.data.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ApiResponse<T> {
    private boolean success;
    private T data;
    
    public static <T> ApiResponse<T> success(T data) {
        return new ApiResponse<>(true, data);
    }
    
    public static <T> ApiResponse<T> fail(T data) {
        return new ApiResponse<>(false, data);
    }
}