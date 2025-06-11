package io.nology.employeecreator.employee;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import io.nology.employeecreator.contract.Contract;
import io.nology.employeecreator.role.Role;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
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

    @Column(nullable = false)
    private boolean isActive = true;

    private LocalDateTime deletedAt;

    @ManyToOne()
    @JoinColumn(name = "role_id", nullable = false)
    private Role role;

    @JsonManagedReference
    @OneToMany(mappedBy = "employee", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Contract> contracts;
}