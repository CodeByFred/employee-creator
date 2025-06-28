package io.nology.employeecreator.department;

import io.nology.employeecreator.exceptions.NotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@Slf4j
@RestController
@RequestMapping("/departments")
public class DepartmentController {

    private final DepartmentService departmentService;

    public DepartmentController(DepartmentService departmentService) {
        this.departmentService = departmentService;
    }

    @GetMapping
    public ResponseEntity<List<Department>> getAll() {
        log.debug("GET /departments - Fetching all departments");
        return new ResponseEntity<>(this.departmentService.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Department> getDepartmentById(@PathVariable Long id) throws NotFoundException {
        log.debug("GET /departments/id - Fetching department with id {}", id);
        Optional<Department> foundDepartment = this.departmentService.findById(id);
        if (foundDepartment.isPresent()) {
            log.info("Department {} found", id);
            return ResponseEntity.ok(foundDepartment.get());
        }
        log.warn("Department {} not found", id);
        throw new NotFoundException("Department " + id + " does not exist");
    }
}