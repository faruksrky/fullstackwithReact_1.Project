package com.example.fullstackspringbootreact.student.repository;

import com.example.fullstackspringbootreact.student.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {

    @Query("SELECT case when count(s) > 0 THEN " +
            "true else false end " +
            "FROM Student s " +
            "where s.email = ?1")
    Boolean selectExistEmail (String email);


}
