package com.example.fullstackspringbootreact.student.model;

import com.example.fullstackspringbootreact.student.enums.Gender;
import lombok.*;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@Entity
@Table (name = "tbl_STUDENT")
public class Student {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long student_id;
    @NotBlank
    @Column(nullable = false)
    private String name;
    @Email
    @Column(nullable = false, unique = true)
    private String email;
    @Enumerated (EnumType.STRING)
    private Gender gender;

    public Student(String name, String email, Gender gender) {
        this.name = name;
        this.email = email;
        this.gender = gender;
    }
}
