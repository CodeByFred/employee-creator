package io.nology.employeecreator.department;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DepartmentService {

    private final DepartmentRepository departmentRepository;

    DepartmentService(DepartmentRepository departmentRepository) {
        this.departmentRepository = departmentRepository;
    }

    public List<Department> findAll() {
        return this.departmentRepository.findAll();
    }

    public Optional<Department> findById(Integer id) {
        return this.departmentRepository.findById(id);
    }
}
