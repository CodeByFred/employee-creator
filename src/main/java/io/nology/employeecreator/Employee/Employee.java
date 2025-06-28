package io.nology.employeecreator.employee;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name = "employees")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String givenName;

    private String surname;

    @Column(unique = true)
    @Email(message = "Invalid email format")
    private String email;

    @Column(unique = true)
    private String phone;

    private String address;

    @Column(nullable = false)
    private boolean isActive = true;
}