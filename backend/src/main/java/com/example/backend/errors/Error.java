package com.example.backend.errors;

import java.sql.Date;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

@ControllerAdvice
public class Error extends Exception {

    @ExceptionHandler(value = Exception.class)
    public ResponseEntity<ErrorDetails> otherExceptionHandler(
            Exception e,
            WebRequest req) {

        ErrorDetails errorDetails = new ErrorDetails(
                e.getMessage(),
                req.getDescription(false),
                new Date(System.currentTimeMillis()));

        return new ResponseEntity<ErrorDetails>(errorDetails, HttpStatus.INTERNAL_SERVER_ERROR);
    }

}