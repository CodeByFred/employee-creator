package io.nology.employeecreator.employee;

import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

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

    @PostMapping
    public ResponseEntity<Employee> createEmployee(@Valid @RequestBody CreateEmployeeDTO data) {
        log.info("POST /employees - Creating employee");
        Employee saved = this.employeeService.create(data);
        log.info("Successfully created employee id {}", saved.getId());
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @GetMapping
    public ResponseEntity<List<Employee>> getAll() {
        log.debug("GET /employees - Fetching all employees");
        return ResponseEntity.ok(this.employeeService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Employee> getById(@PathVariable Integer id) {
        log.debug("GET /employees/id - Fetching employee id {}", id);
        Optional<Employee> foundEmployee = this.employeeService.findById(id);
        if (foundEmployee.isPresent()) {
            log.info("Employee id {} found", id);
            return ResponseEntity.ok(foundEmployee.get());
        }
        log.warn("Employee id {} does not exist", id);
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Employee " + id + " does not exist");
    }

    // Typically will be a partial update (some null fields) but @Valid is still useful in this context
    @PatchMapping("/{id}")
    public ResponseEntity<Employee> updateById(@PathVariable Integer id, @Valid @RequestBody UpdateEmployeeDTO data) {
        log.info("PATCH /employees/id - Updating employee id {}", id);
        Optional<Employee> result = this.employeeService.updateById(id, data);
        Employee updated = result.orElseThrow(() -> {
            log.warn("Employee id {} does not exist", id);
            return new ResponseStatusException(HttpStatus.NOT_FOUND, "Could not update Employee " + id + " that employee does not exist");
        });
        return new ResponseEntity<>(updated, HttpStatus.OK);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable Integer id) {
        log.info("DELETE /employees/id - Deleting employee id {}", id);
        if (this.employeeService.deleteById(id)) {
            log.info("Employee id {} has been deleted", id);
            return ResponseEntity.noContent().build();
        }
        log.warn("Employee id {} does not exist", id);
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Employee " + id + " does not exist");
    }
}