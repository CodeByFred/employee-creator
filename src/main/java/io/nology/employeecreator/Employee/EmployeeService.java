package io.nology.employeecreator.Employee;

import jakarta.validation.Valid;
import org.springframework.stereotype.Service;

@Service
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

    EmployeeService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    public Employee create(@Valid CreateEmployeeDTO data) {
        Employee newEmployee  = new Employee();
        newEmployee.setGivenName(data.getGivenName());
        newEmployee.setSurname(data.getSurname());
        newEmployee.setEmail(data.getEmail());
        newEmployee.setPhone(data.getPhone());
        newEmployee.setAddress(data.getAddress());
        return this.employeeRepository.save(newEmployee);
    }
}
