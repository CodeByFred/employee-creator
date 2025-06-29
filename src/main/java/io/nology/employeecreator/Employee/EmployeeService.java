package io.nology.employeecreator.employee;

import io.nology.employeecreator.department.DepartmentType;
import io.nology.employeecreator.employee.dtos.CreateEmployeeDTO;
import io.nology.employeecreator.employee.dtos.EmployeeSummaryDTO;
import io.nology.employeecreator.employee.dtos.UpdateEmployeeDTO;
import io.nology.employeecreator.employeerole.EmployeeRole;
import io.nology.employeecreator.exceptions.ServiceValidationException;
import io.nology.employeecreator.exceptions.ValidationErrors;
import io.nology.employeecreator.role.RoleType;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

    public EmployeeService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    public Employee create(@Valid CreateEmployeeDTO data) throws ServiceValidationException {

        Employee newEmployee = new Employee();
        newEmployee.setGivenName(data.getGivenName().trim());
        newEmployee.setSurname(data.getSurname().trim());
        ValidationErrors errors = new ValidationErrors();

        if (this.employeeRepository.existsByEmail(data.getEmail())) {
            errors.add("email", "Email address is already in use");
        }

        newEmployee.setEmail(data.getEmail());

        if (this.employeeRepository.existsByPhone(data.getPhone())) {
            errors.add("phone", "Phone number is already in use");
        }

        newEmployee.setPhone(data.getPhone());

        if (errors.hasErrors()) {
            throw new ServiceValidationException(errors);
        }
        newEmployee.setAddress(data.getAddress().trim());

        Employee saved = this.employeeRepository.save(newEmployee);
        log.info("Employee created: {}", saved);
        return saved;
    }

    public List<EmployeeSummaryDTO> findAll() {
        log.debug("Fetching all employee summaries");
        List<Employee> employees = this.employeeRepository.findAll();

        return employees.stream().map(employee -> {
            // Find the employee role with an active contract
            EmployeeRole currentRole = employee.getEmployeeRoles().stream()
                    .filter(er -> er.getContract() != null && er.getContract().hasActiveContract())
                    .max(Comparator.comparing(er -> er.getContract().getStartDate()))
                    .orElse(null);

            RoleType roleType = currentRole != null ? currentRole.getRole().getRoleType() : RoleType.UNASSIGNED;
            DepartmentType department = currentRole != null ? currentRole.getRole().getDepartment().getDepartment() : DepartmentType.UNASSIGNED;

            return new EmployeeSummaryDTO(
                    employee.getId(),
                    employee.getGivenName(),
                    employee.getSurname(),
                    employee.getEmail(),
                    employee.getPhone(),
                    employee.getAddress(),
                    roleType,
                    department,
                    employee.isActive()
            );
        }).toList();
    }

//    public List<Employee> findAll() {
//        log.debug("Fetching all employees");
//        return this.employeeRepository.findAll();
//    }

    public Optional<Employee> findById(Long id) {
        log.debug("Fetching employee id {}", id);
        return this.employeeRepository.findById(id);
    }

    public Optional<Employee> updateById(Long id, UpdateEmployeeDTO data) throws ServiceValidationException {


        Optional<Employee> foundEmployee = this.findById(id);

        if (foundEmployee.isEmpty()) {
            return foundEmployee;
        }

        Employee employeeFromDB = foundEmployee.get();

        ValidationErrors errors = new ValidationErrors();

        boolean noChanges =
                (data.getGivenName() == null || data.getGivenName().trim().equals(employeeFromDB.getGivenName())) &&
                        (data.getSurname() == null || data.getSurname().trim().equals(employeeFromDB.getSurname())) &&
                        (data.getEmail() == null || data.getEmail().trim().equalsIgnoreCase(employeeFromDB.getEmail())) &&
                        (data.getPhone() == null || data.getPhone().trim().equals(employeeFromDB.getPhone())) &&
                        (data.getAddress() == null || data.getAddress().trim().equals(employeeFromDB.getAddress()));

        if (noChanges) {
            errors.add("employee", "No changes detected");
            log.info("No changes detected for employee id {}", id);
            throw new ServiceValidationException(errors);
        }

        if (data.getGivenName() != null) {
            employeeFromDB.setGivenName(data.getGivenName().trim());
        }

        if (data.getSurname() != null) {
            employeeFromDB.setSurname(data.getSurname().trim());
        }


        if (data.getEmail() != null &&
                !data.getEmail().equalsIgnoreCase(employeeFromDB.getEmail()) &&
                employeeRepository.existsByEmail(data.getEmail())) {
            errors.add("email", "Email address is already in use");
        }

        if (data.getPhone() != null &&
                !data.getPhone().equals(employeeFromDB.getPhone()) &&
                employeeRepository.existsByPhone(data.getPhone())) {
            errors.add("phone", "Phone number is already in use");
        }

        if (errors.hasErrors()) {
            throw new ServiceValidationException(errors);
        }

        if (data.getAddress() != null) {
            employeeFromDB.setAddress(data.getAddress().trim());
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

    public boolean deleteById(Long id) {
        Optional<Employee> foundEmployee = this.findById(id);
        if (foundEmployee.isEmpty()) {
            return false;
        }
        Employee employeeFromDB = foundEmployee.get();
        this.employeeRepository.delete(employeeFromDB);
        log.info("Deleting employee id {}", id);
        return true;
    }

//    public List<Employee> findByIsActive(Boolean isActive) {
//        return employeeRepository.findByIsActive(isActive);
//    }
}