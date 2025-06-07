package io.nology.employeecreator.employee;

import io.nology.employeecreator.contract.Contract;
import io.nology.employeecreator.role.Role;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "employees")
public class Employee {

    @Setter
    @Getter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Setter
    @Getter
    private String givenName;

    @Setter
    @Getter
    private String surname;

    @Setter
    @Getter
    @Column(unique = true)
    @Email
    private String email;

    @Setter
    @Getter
    @Column(unique = true)
    private String phone;

    @Setter
    @Getter
    private String address;

    @ManyToOne()
    @JoinColumn(name = "role_id", nullable = false)
    @Getter
    @Setter
    private Role role;

    @OneToMany(mappedBy = "employee")
    @Getter
    @Setter
    private List<Contract> contracts;
}
