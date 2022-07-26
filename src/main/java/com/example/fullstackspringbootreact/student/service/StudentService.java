package com.example.fullstackspringbootreact.student.service;

import com.example.fullstackspringbootreact.student.exception.BadRequestException;
import com.example.fullstackspringbootreact.student.model.Student;
import com.example.fullstackspringbootreact.student.repository.StudentRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.StreamSupport;

@Service
@AllArgsConstructor
public class StudentService {

    private final StudentRepository studentRepository;

    public List<Student> getAllStudent(){
        return studentRepository.findAll();
    }

    public Student getStudent (Long studentId){
        return studentRepository.findById(studentId)
                .orElseThrow(() -> new IllegalArgumentException ("student with studentID :" + studentId + "could not be found"));
    }

    public void addStudent(Student student){
        Boolean existEmail = studentRepository.selectExistEmail(student.getEmail());
        if (existEmail){
            throw new BadRequestException(
                    "Email" + student.getEmail() + "taken");
        }
        studentRepository.save(student);
    }

    public void deleteStudent(Long student_id) {
        studentRepository.deleteById(student_id);


    }
}
