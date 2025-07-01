package io.nology.employeecreator.employee;

import io.nology.employeecreator.employee.dtos.CreateEmployeeDTO;
import io.nology.employeecreator.employee.dtos.EmployeeSummaryDTO;
import io.nology.employeecreator.employee.dtos.UpdateEmployeeDTO;
import io.nology.employeecreator.exceptions.NotFoundException;
import io.nology.employeecreator.exceptions.ServiceValidationException;
import io.nology.employeecreator.exceptions.UpdateFailureException;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Slf4j
@RestController
@RequestMapping("/employees")
public class EmployeeController {

    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    private void logEmployeeNotFound(Long id) {
        log.warn("Employee id {} does not exist", id);
    }

    @PostMapping
    public ResponseEntity<Employee> createEmployee(@Valid @RequestBody CreateEmployeeDTO data) throws ServiceValidationException {
        log.info("POST /employees - Creating employee");
        Employee saved = this.employeeService.create(data);
        log.info("Successfully created employee id {}", saved);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

//    GET /employees -> all employees
//    GET /employees?active=true -> only active
//    GET /employees?active=false -> only inactive
    @GetMapping
    public ResponseEntity<List<EmployeeSummaryDTO>> getAllEmployees(@RequestParam(required = false) Boolean active) {
        log.debug("GET /employees - Fetching all employees: optional active={}", active);
        if (active != null) {
            return ResponseEntity.ok(employeeService.findAllByActive(active));
        }
        return ResponseEntity.ok(this.employeeService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Employee> getById(@PathVariable Long id) throws NotFoundException {
        log.debug("GET /employees/id - Fetching employee id {}", id);
        Optional<Employee> foundEmployee = this.employeeService.findById(id);
        if (foundEmployee.isPresent()) {
            log.info("Employee id {} found", id);
            return ResponseEntity.ok(foundEmployee.get());
        }
        logEmployeeNotFound(id);
        throw new NotFoundException("Employee " + id + " does not exist");
    }

    // Typically will be a partial update (some null fields) but @Valid is still useful in this context
    @PatchMapping("/{id}")
    public ResponseEntity<Employee> updateById(@PathVariable Long id, @Valid @RequestBody UpdateEmployeeDTO data) throws NotFoundException, ServiceValidationException {
        log.info("PATCH /employees/id - Updating employee id {}", id);
        Optional<Employee> result = this.employeeService.updateById(id, data);
        Employee updated = result.orElseThrow(() -> {
            logEmployeeNotFound(id);
            return new NotFoundException("Could not update Employee " + id + " that employee does not exist");
        });
        return new ResponseEntity<>(updated, HttpStatus.OK);
    }

    // Setting isActive to soft delete or re-activate an employee
    @PutMapping("/{id}/toggleIsActive")
    public ResponseEntity<Employee> toggleActive(@PathVariable Long id) throws UpdateFailureException, NotFoundException {
        log.info("PUT /employees/id/toggle-active - Toggling employee id {} isActive", id);
        Employee employee = this.employeeService.findById(id)
                .orElseThrow(() -> {logEmployeeNotFound(id); return new NotFoundException("Could not update Employee " + id + " that employee does not exist");});


        boolean response = this.employeeService.toggleIsActive(employee);
        if(response) {
            log.info("Employee id {} isActive status is now {}", id, employee);
            return new ResponseEntity<>(employee, HttpStatus.OK);

        }
        throw new UpdateFailureException("Employee " + id + " could not be updated");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable Long id) throws NotFoundException {
        log.info("DELETE /employees/id - Deleting employee id {}", id);
        if (this.employeeService.deleteById(id)) {
            log.info("Employee id {} has been deleted", id);
            return ResponseEntity.noContent().build();
        }
        logEmployeeNotFound(id);
        throw new NotFoundException("Employee " + id + " does not exist");
    }
}