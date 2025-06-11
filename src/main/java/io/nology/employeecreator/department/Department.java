package io.nology.employeecreator.department;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import io.nology.employeecreator.role.Role;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "departments")
public class Department {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer departmentId;

    @Enumerated(EnumType.STRING)
    private DepartmentType department;

    @OneToMany(mappedBy = "department")
    @JsonIgnoreProperties("roles")
    private List<Role> roles;
}
