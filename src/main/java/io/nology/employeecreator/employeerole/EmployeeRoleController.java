package io.nology.employeecreator.employeerole;

import io.nology.employeecreator.exceptions.NotFoundException;
import io.nology.employeecreator.exceptions.ServiceValidationException;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/employee_roles")
public class EmployeeRoleController {

    private final EmployeeRoleService employeeRoleService;

    public EmployeeRoleController(EmployeeRoleService employeeRoleService) {
        this.employeeRoleService = employeeRoleService;
    }

    @PostMapping
    public ResponseEntity<EmployeeRole> createEmployeeRole(@RequestBody CreateEmployeeRoleDTO data) throws NotFoundException, ServiceValidationException {
        log.info("POST /employee_roles - Creating Employee Role");
        EmployeeRole employeeRole = this.employeeRoleService.create(data);
        log.info("Successfully created employee role {}", employeeRole);
        return ResponseEntity.status(HttpStatus.CREATED).body(employeeRole);
    }

    @GetMapping
    public ResponseEntity<List<EmployeeRole>> getAllEmployeeRoles() {
        log.debug("GET /employee_roles - Fetching all employee roles");
        return ResponseEntity.ok(this.employeeRoleService.findAll());
    }

    @PatchMapping("/{id}")
    public ResponseEntity<EmployeeRole>  updateEmployeeRole(@PathVariable Long id, @Valid @RequestBody UpdateEmployeeRoleDTO data) throws NotFoundException, ServiceValidationException {
        EmployeeRole updated = this.employeeRoleService.update(id, data);
        log.info("PATCH /employee_roles/{} - Updating employee role", id);
        return ResponseEntity.ok(updated);
    }
}