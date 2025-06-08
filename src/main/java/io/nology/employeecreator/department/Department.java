package io.nology.employeecreator.department;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import io.nology.employeecreator.role.Role;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

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
    @JsonManagedReference
    private List<Role> roles;
}
