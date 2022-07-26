package com.example.fullstackspringbootreact.student.controller;

import com.example.fullstackspringbootreact.student.model.Student;
import com.example.fullstackspringbootreact.student.enums.Gender;
import com.example.fullstackspringbootreact.student.service.StudentService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Arrays;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping(path = "api/v1/students")
public class StudentController {

    private final StudentService studentService;

    @GetMapping
    public List<Student> getStudents() {
        return studentService.getAllStudent();
    }

    @PostMapping
    public ResponseEntity<Void> addStudent(@Valid @RequestBody Student student){
        studentService.addStudent(student);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping (path = "{student_id}")
    public void deleteStudent(@PathVariable ("student_id") Long student_id){
        studentService.deleteStudent(student_id);
    }
}
