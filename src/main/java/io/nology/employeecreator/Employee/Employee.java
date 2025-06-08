package io.nology.employeecreator.employee;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import io.nology.employeecreator.contract.Contract;
import io.nology.employeecreator.role.Role;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@Entity
@Table(name = "employees")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String givenName;

    private String surname;

    @Column(unique = true)
    @Email(message = "Invalid email format")
    private String email;

    @Column(unique = true)
    private String phone;

    private String address;

    @ManyToOne()
    @JoinColumn(name = "role_id", nullable = false)
    private Role role;

    @JsonManagedReference
    @OneToMany(mappedBy = "employee")
    private List<Contract> contracts;
}