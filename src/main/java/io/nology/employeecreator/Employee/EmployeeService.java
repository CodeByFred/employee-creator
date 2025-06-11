package io.nology.employeecreator.employee;

import io.nology.employeecreator.role.Role;
import io.nology.employeecreator.role.RoleRepository;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final RoleRepository roleRepository;

    public EmployeeService(EmployeeRepository employeeRepository, RoleRepository roleRepository) {
        this.employeeRepository = employeeRepository;
        this.roleRepository = roleRepository;
    }

    public Employee create(@Valid CreateEmployeeDTO data) {
        log.info("Fetching role to create for employee");
        Role role = roleRepository.findById(data.getRoleId()).orElseThrow(() -> {
            log.warn("Role id {} does not exists", data.getRoleId());
            return new ResponseStatusException((HttpStatus.NOT_FOUND), "Role " + data.getRoleId() + " does not exist");
        });

        log.info("Role id {} found. Creating new employee", data.getRoleId());
        Employee newEmployee = new Employee();
        newEmployee.setGivenName(data.getGivenName().trim());
        newEmployee.setSurname(data.getSurname().trim());
        newEmployee.setEmail(data.getEmail().trim());
        newEmployee.setPhone(data.getPhone().trim());
        newEmployee.setAddress(data.getAddress().trim());
        newEmployee.setRole(role);

        Employee saved = this.employeeRepository.save(newEmployee);
        log.info("Created employee id {} with role id {}", saved.getId(), data.getRoleId());
        return saved;
    }

    public List<Employee> findAll() {
        log.debug("Fetching all employees");
        return this.employeeRepository.findAll();
    }

    public Optional<Employee> findById(Integer id) {
        log.debug("Fetching employee id {}", id);
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
            Role role = roleRepository.findById(data.getRoleId()).orElseThrow(() -> {
                log.warn("Role id {} does not exist", data.getRoleId());
                return new ResponseStatusException((HttpStatus.NOT_FOUND), "Role " + data.getRoleId() + " does not exist");
            });
            employeeFromDB.setRole(role);
        }

        this.employeeRepository.save(employeeFromDB);
        log.info("Employee id {} has been updated", employeeFromDB.getId());
        return Optional.of(employeeFromDB);
    }

    public boolean toggleIsActive(Employee employee) {
        employee.setActive(!employee.isActive());
        this.employeeRepository.save(employee);
        log.info("Employee id {} isActive status has been modified", employee.getId());
        return true;
    }

    public boolean deleteById(Integer id) {
        Optional<Employee> foundEmployee = this.findById(id);
        if (foundEmployee.isEmpty()) {
            return false;
        }
        Employee employeeFromDB = foundEmployee.get();
        this.employeeRepository.delete(employeeFromDB);
        log.info("Deleting employee id {}", id);
        return true;
    }


}