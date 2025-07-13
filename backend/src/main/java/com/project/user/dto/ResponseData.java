package com.project.user.dto;

public class ResponseData<T> {
    private String error;
    private int status;
    private T data;
    private String message;

    public ResponseData() {}

    public ResponseData(String error, int status, T data, String message) {
        this.error = error;
        this.status = status;
        this.data = data;
        this.message = message;
    }

    public static <T> ResponseData<T> success(T data, String message) {
        return new ResponseData<>(null, 200, data, message);
    }

    public static <T> ResponseData<T> error(String errorMessage, int statusCode, String message) {
        return new ResponseData<>(errorMessage, statusCode, null, message);
    }

    // Getters and setters
    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
