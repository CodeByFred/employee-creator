package io.nology.employeecreator.department;

import io.nology.employeecreator.role.RoleDTO;
import lombok.Getter;

import java.util.List;

@Getter
public class DepartmentWithRolesDTO {
    private final Long departmentId;
    private final DepartmentType department;
    private final List<RoleDTO> roles;

    public DepartmentWithRolesDTO(Department department) {
        this.departmentId = department.getDepartmentId();
        this.department = department.getDepartment();
        this.roles = department.getRoles().stream()
                .map(RoleDTO::new)
                .toList();
    }
}
