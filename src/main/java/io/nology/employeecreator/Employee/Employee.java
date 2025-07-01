package io.nology.employeecreator.employee;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import io.nology.employeecreator.contract.Contract;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

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
    private boolean active = true;

    @OneToMany(mappedBy = "employee", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Contract> contracts = new ArrayList<>();
}