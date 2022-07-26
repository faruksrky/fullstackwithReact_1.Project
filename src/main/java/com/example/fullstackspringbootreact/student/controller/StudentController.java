package com.example.fullstackspringbootreact.controller;

import com.example.fullstackspringbootreact.enums.Gender;
import com.example.fullstackspringbootreact.model.Student;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Array;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping(path = "api/v1/students")
public class StudentController {

    @GetMapping
    public List<Student> getStudents() {
        List<Student> students = Arrays.asList(
                new Student(
                        1L,
                        "Faruk",
                        "faruksrky@gmail.com",
                        Gender.MALE),
                new Student(
                        2L,
                        "Rumeysa",
                        "rumeysasrky@gmail.com",
                        Gender.FEMALE)
        );
        return students;
    }
}
