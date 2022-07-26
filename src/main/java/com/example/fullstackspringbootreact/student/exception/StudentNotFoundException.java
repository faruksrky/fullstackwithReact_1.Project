package com.example.fullstackspringbootreact.student.exception;

public class StudentNotFoundException extends RuntimeException {

    public StudentNotFoundException (String msg){
        super(msg);
    }
}
