package io.nology.employeecreator.employee;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/employees")
public class EmployeeController {

    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @PostMapping
    public ResponseEntity<Employee> createEmployee(@Valid @RequestBody CreateEmployeeDTO data) {
        Employee saved = this.employeeService.create(data);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @GetMapping
    public ResponseEntity<List<Employee>> getAll() {
        return ResponseEntity.ok(this.employeeService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Employee> getById(@PathVariable Integer id) {
        Optional<Employee> foundEmployee = this.employeeService.findById(id);
        if(foundEmployee.isPresent()) {
            return ResponseEntity.ok(foundEmployee.get());
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Employee " + id + " does not exist");
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Employee> updateById(@PathVariable Integer id, @Valid @RequestBody UpdateEmployeeDTO data) {
        Optional<Employee> result = this.employeeService.updateById(id, data);
        Employee updated = result.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Could not update Employee " + id + " that employee does not exist"));
        return new ResponseEntity<>(updated, HttpStatus.OK);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable Integer id) {
        if(this.employeeService.deleteById(id)) {
            return ResponseEntity.noContent().build();
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Employee " + id + " does not exist");
    }
}