package io.nology.employeecreator.employeerole;

import io.nology.employeecreator.contract.Contract;
import io.nology.employeecreator.contract.ContractRepository;
import io.nology.employeecreator.employee.Employee;
import io.nology.employeecreator.employee.EmployeeRepository;
import io.nology.employeecreator.exceptions.NotFoundException;
import io.nology.employeecreator.exceptions.ServiceValidationException;
import io.nology.employeecreator.exceptions.ValidationErrors;
import io.nology.employeecreator.role.Role;
import io.nology.employeecreator.role.RoleRepository;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Transactional
@Slf4j
@Service
public class EmployeeRoleService {

    private final EmployeeRoleRepository employeeRoleRepository;
    private final RoleRepository roleRepository;
    private final ContractRepository contractRepository;

    public EmployeeRoleService(EmployeeRoleRepository employeeRoleRepository, RoleRepository roleRepository, ContractRepository contractRepository) {
        this.employeeRoleRepository = employeeRoleRepository;
        this.roleRepository = roleRepository;
        this.contractRepository = contractRepository;
    }

    public EmployeeRole create(CreateEmployeeRoleDTO data) throws NotFoundException, ServiceValidationException {

        Optional<Role> role = roleRepository.findById(data.getRoleId());
        if (role.isEmpty()) {
            log.warn("Role with id {} not found", data.getRoleId());
            ValidationErrors errors = new ValidationErrors();
            errors.add("role", "Role " + data.getRoleId() + " does not exist");
            throw new ServiceValidationException(errors);
        }

        Optional<Contract> contract = contractRepository.findById(data.getContractId());
        if (contract.isEmpty()) {
            log.warn("Contract with id {} not found", data.getContractId());
            throw new  NotFoundException("Contract " + data.getContractId() + " does not exist");
        }

        EmployeeRole employeeRole = new EmployeeRole();
        employeeRole.setRole(role.get());
        employeeRole.setContract(contract.get());
        employeeRole.setPriorYearsOfExperience(data.getPriorYearsOfExperience());
        employeeRole.setPromotionType(data.getPromotionType());
        employeeRole.setPerformanceRating(data.getPerformanceRating());
        employeeRoleRepository.save(employeeRole);
        log.info("Employee role created: {}", employeeRole);
        return employeeRole;
    }

    public List<EmployeeRole> findAll() {
        log.debug("Fetching all employee roles");
        return this.employeeRoleRepository.findAll();
    }

    public EmployeeRole update(Long id, @Valid UpdateEmployeeRoleDTO data) throws NotFoundException, ServiceValidationException {

        Optional<EmployeeRole> foundEmployeeRole = employeeRoleRepository.findById(id);
        if (foundEmployeeRole.isEmpty()) {
            log.warn("Employee role with id {} not found", id);
            throw new NotFoundException("Employee role with id " + id + " does not exist");
        }

        EmployeeRole employeeRoleFromDB = foundEmployeeRole.get();

        ValidationErrors  errors = new ValidationErrors();

        boolean noChanges =
                (data.getPriorYearsOfExperience() == null || data.getPriorYearsOfExperience().equals(employeeRoleFromDB.getPriorYearsOfExperience())) &&
                        (data.getPromotionType() == null || data.getPromotionType().equals(employeeRoleFromDB.getPromotionType())) &&
                        (data.getPerformanceRating() == null || data.getPerformanceRating().equals(employeeRoleFromDB.getPerformanceRating()));

        if (noChanges) {
            errors.add("employee roles", "No changes were made to update");
            throw new ServiceValidationException(errors);
        }

        if(data.getPriorYearsOfExperience() != null) {
            employeeRoleFromDB.setPriorYearsOfExperience(data.getPriorYearsOfExperience());
        }

        if(data.getPromotionType() != null) {
            employeeRoleFromDB.setPromotionType(data.getPromotionType());
        }

        if(data.getPerformanceRating() != null) {
        employeeRoleFromDB.setPerformanceRating(data.getPerformanceRating());
        }

        employeeRoleRepository.save(employeeRoleFromDB);
        log.info("Employee role updated: {}", employeeRoleFromDB.getId());
        return employeeRoleFromDB;
    }
}