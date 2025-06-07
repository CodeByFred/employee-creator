package io.nology.employeecreator.role;

import com.fasterxml.jackson.annotation.JsonBackReference;
import io.nology.employeecreator.department.Department;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "roles")
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer roleId;

    @Enumerated(EnumType.STRING)
    private RoleType roleType;

    @ManyToOne
    @JoinColumn(name = "department_id", nullable = false)
    @JsonBackReference
    private Department department;
}
