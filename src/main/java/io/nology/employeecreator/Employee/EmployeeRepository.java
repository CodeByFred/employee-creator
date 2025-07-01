package io.nology.employeecreator.employee;

import io.nology.employeecreator.employee.dtos.EmployeeSummaryDTO;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    boolean existsByEmail(String email);

    boolean existsByPhone(String phone);

    List<Employee> findAllByActive(Boolean active);
}