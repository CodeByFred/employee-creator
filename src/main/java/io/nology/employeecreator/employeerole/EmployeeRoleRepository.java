package io.nology.employeecreator.employeerole;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EmployeeRoleRepository extends JpaRepository<EmployeeRole,Long> {

    List<EmployeeRole> findByEmployeeId(Long id);
}
