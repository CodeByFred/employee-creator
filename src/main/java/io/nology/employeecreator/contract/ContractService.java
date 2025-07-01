package io.nology.employeecreator.contract;

import io.nology.employeecreator.employee.Employee;
import io.nology.employeecreator.employee.EmployeeRepository;
import io.nology.employeecreator.exceptions.NotFoundException;
import io.nology.employeecreator.exceptions.ServiceValidationException;
import io.nology.employeecreator.exceptions.ValidationErrors;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class ContractService {

    private final ContractRepository contractRepository;
    private final EmployeeRepository employeeRepository;

    public ContractService(ContractRepository contractRepository,  EmployeeRepository employeeRepository) {
        this.contractRepository = contractRepository;
        this.employeeRepository = employeeRepository;
    }

    public Contract create(@Valid CreateContractDTO data) throws ServiceValidationException, NotFoundException {
        log.info("Creating contract");

        Optional<Employee> employee = employeeRepository.findById(data.getEmployeeId());
        if (employee.isEmpty()) {
            log.warn("Employee with id {} not found", data.getEmployeeId());
            throw new  NotFoundException("Employee " + data.getEmployeeId() + " does not exist");
        }

        Contract newContract = new Contract();
        newContract.setContractType(data.getContractType());
        newContract.setStartDate(data.getStartDate());
        newContract.setFinishDate(data.getFinishDate());
        newContract.setContractEmploymentType(data.getContractEmploymentType());
        newContract.setHoursPerWeek(data.getHoursPerWeek());
        newContract.setEmployee(employee.get());

        Contract saved = this.contractRepository.save(newContract);
        log.info("Created contract id {}", saved.getId());
        return saved;
    }

    public List<Contract> findAll() {
        log.debug("Fetching all contracts");
        return this.contractRepository.findAll();
    }

    public Optional<Contract> findById(Long id) {
        log.debug("Fetching contract by id {}", id);
        return this.contractRepository.findById(id);
    }

    public Contract updateById(Long id, @Valid UpdateContractDTO data) throws ServiceValidationException, NotFoundException {

        Optional<Contract> foundContract = contractRepository.findById(id);
        if(foundContract.isEmpty()) {
            log.warn("No contract found with id {}", id);
            throw new NotFoundException("No contract found with id " + id);
        }

        Contract contractFromDB = foundContract.get();

        ValidationErrors errors = new ValidationErrors();

        boolean noChanges = (data.getFinishDate() == null || data.getFinishDate().isAfter(contractFromDB.getFinishDate()));

        if(noChanges) {
            errors.add("contract", "No changes were made to end date");
            throw new ServiceValidationException(errors);
        }

        contractFromDB.setFinishDate(data.getFinishDate());

        contractRepository.save(contractFromDB);
        log.info("Updated contract with id {}", contractFromDB.getId());
        return contractFromDB;
    }

    public List<Contract> findByEmployeeId(Long id) throws NotFoundException {
        log.debug("Fetching contracts by employee id");
        List<Contract> employeeContracts = this.contractRepository.findByEmployeeId(id);
        if(employeeContracts.isEmpty()) {
            log.warn("No contracts found with employee id {}", id);
            throw new NotFoundException("Contracts for employee " + id + " does not exist");
        }
        log.info("Found contracts for employee {}", id);
        return employeeContracts;
    }
}