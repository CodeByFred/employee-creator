package io.nology.employeecreator.employee.dtos;

import io.nology.employeecreator.department.DepartmentType;
import io.nology.employeecreator.role.RoleType;

public record EmployeeSummaryDTO(Long id, String givenName, String surname, String email, String phone, String address,
                                 RoleType role, DepartmentType department, boolean isActive) {
}
