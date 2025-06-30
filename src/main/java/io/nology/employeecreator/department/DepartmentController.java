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
    public ResponseEntity<List<DepartmentWithRolesDTO>> getAll() {
        log.debug("GET /departments - Fetching all departments");

        List<DepartmentWithRolesDTO> departments = departmentService.findAll().stream()
                .map(DepartmentWithRolesDTO::new)
                .toList();

        return ResponseEntity.ok(departments);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DepartmentWithRolesDTO> getDepartmentById(@PathVariable Long id) throws NotFoundException {
        log.debug("GET /departments/{} - Fetching department", id);

        Department department = departmentService.findById(id)
                .orElseThrow(() -> {
                    log.warn("Department {} not found", id);
                    return new NotFoundException("Department " + id + " does not exist");
                });

        log.info("Department {} found", id);
        return ResponseEntity.ok(new DepartmentWithRolesDTO(department));
    }
}