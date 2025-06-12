package io.nology.employeecreator.contract;

import io.nology.employeecreator.employee.Employee;
import io.nology.employeecreator.employee.EmployeeRepository;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class ContractService {

    private final ContractRepository contractRepository;
    private final EmployeeRepository employeeRepository;

    public ContractService(ContractRepository contractRepository, EmployeeRepository employeeRepository) {
        this.contractRepository = contractRepository;
        this.employeeRepository = employeeRepository;
    }

    public Contract create(@Valid CreateContractDTO data) {

        Employee employee = employeeRepository.findById(data.getEmployeeId()).orElseThrow(() -> {
            log.warn("Employee {} not found", data.getEmployeeId());
            return new ResponseStatusException(HttpStatus.NOT_FOUND, "Employee " + data.getEmployeeId() + " does not exist");
        });

        boolean hasActive = contractRepository.findByEmployeeId(employee.getId()).stream().anyMatch(Contract::isActive);

        if (hasActive) {
            log.warn("Employee {} already has an active contract", employee.getId());
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Employee already has an active contract");
        }

        Contract newContract = new Contract();
        newContract.setContractType(data.getContractType());
        newContract.setStartDate(data.getStartDate());
        newContract.setFinishDate(data.getFinishDate());
        newContract.setContractEmploymentType(data.getContractEmploymentType());
        newContract.setHoursPerWeek(data.getHoursPerWeek());
        newContract.setEmployee(employee);

        Contract saved = this.contractRepository.save(newContract);
        log.info("Created contract {} for employee {}", saved.getId(), employee.getId());
        return saved;
    }

    public List<Contract> findAll() {
        log.debug("Fetching all contracts");
        return this.contractRepository.findAll();
    }

    public Optional<Contract> findById(Integer id) {
        log.debug("Fetching contract by id {}", id);
        return this.contractRepository.findById(id);
    }
}