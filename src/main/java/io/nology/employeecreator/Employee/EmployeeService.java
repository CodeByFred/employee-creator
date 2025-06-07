package io.nology.employeecreator.employee;

import io.nology.employeecreator.role.Role;
import io.nology.employeecreator.role.RoleRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final RoleRepository roleRepository;

    EmployeeService(EmployeeRepository employeeRepository, RoleRepository roleRepository) {
        this.employeeRepository = employeeRepository;
        this.roleRepository = roleRepository;
    }

    public Employee create(@Valid CreateEmployeeDTO data) {

        Role role = roleRepository.findById(data.getRoleId()).orElseThrow(() -> new ResponseStatusException((HttpStatus.NOT_FOUND), "Role " + data.getRoleId() + " does not exists"));

        Employee newEmployee = new Employee();
        newEmployee.setGivenName(data.getGivenName());
        newEmployee.setSurname(data.getSurname());
        newEmployee.setEmail(data.getEmail());
        newEmployee.setPhone(data.getPhone());
        newEmployee.setAddress(data.getAddress());
        newEmployee.setRole(role);
        return this.employeeRepository.save(newEmployee);
    }

    public List<Employee> findAll() {
        return this.employeeRepository.findAll();
    }

    public Optional<Employee> findById(Integer id) {
        return this.employeeRepository.findById(id);
    }

    public Optional<Employee> updateById(Integer id, UpdateEmployeeDTO data) {

        Optional<Employee> foundEmployee = this.findById(id);

        if (foundEmployee.isEmpty()) {
            return foundEmployee;
        }

        Employee employeeFromDB = foundEmployee.get();

        if (data.getGivenName() != null) {
            employeeFromDB.setGivenName(data.getGivenName().trim());
        }

        if (data.getSurname() != null) {
            employeeFromDB.setSurname(data.getSurname().trim());
        }

        if (data.getEmail() != null) {
            employeeFromDB.setEmail(data.getEmail().trim());
        }

        if (data.getPhone() != null) {
            employeeFromDB.setPhone(data.getPhone().trim());
        }

        if (data.getAddress() != null) {
            employeeFromDB.setAddress(data.getAddress().trim());
        }

        if (data.getRoleId() != null) {
            Role role = roleRepository.findById(data.getRoleId()).orElseThrow(() -> new ResponseStatusException((HttpStatus.NOT_FOUND), "Role " + data.getRoleId() + " does not exists"));
            employeeFromDB.setRole(role);
        }

        this.employeeRepository.save(employeeFromDB);
        return Optional.of(employeeFromDB);
    }

    public boolean deleteById(Integer id) {
        Optional<Employee> foundEmployee = this.findById(id);
        if (foundEmployee.isEmpty()) {
            return false;
        }
        Employee employeeFromDB = foundEmployee.get();
        this.employeeRepository.delete(employeeFromDB);
        return true;
    }
}
