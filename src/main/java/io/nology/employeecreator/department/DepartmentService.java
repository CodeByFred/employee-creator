package io.nology.employeecreator.department;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class DepartmentService {

    private final DepartmentRepository departmentRepository;

    public DepartmentService(DepartmentRepository departmentRepository) {
        this.departmentRepository = departmentRepository;
    }

    public List<Department> findAll() {
        log.debug("Fetching all departments");
        return this.departmentRepository.findAll();
    }

    public Optional<Department> findById(Long id) {
        log.debug("Fetching department by id {}", id);
        return this.departmentRepository.findById(id);
    }
}
