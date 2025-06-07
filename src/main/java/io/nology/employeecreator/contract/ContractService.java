package io.nology.employeecreator.contract;

import io.nology.employeecreator.employee.Employee;
import io.nology.employeecreator.employee.EmployeeRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class ContractService {

    private final ContractRepository contractRepository;
    private final EmployeeRepository employeeRepository;

    public ContractService(ContractRepository contractRepository, EmployeeRepository employeeRepository) {
        this.contractRepository = contractRepository;
        this.employeeRepository = employeeRepository;
    }

    public Contract create(@Valid CreateContractDTO data) {

        Employee employee = employeeRepository.findById(data.getEmployeeId()).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Employee " + data.getEmployeeId() + " does not exist"));

        boolean hasActive = contractRepository.findByEmployeeId(employee.getId()).stream().anyMatch(Contract::isActive);

        if(hasActive) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Employee already has an active contract");
        }

        Contract newContract = new Contract();
        newContract.setContractType(data.getContractType());
        newContract.setStartDate(data.getStartDate());
        newContract.setFinishDate(data.getFinishDate());
        newContract.setContractEmploymentType(data.getEmploymentType());
        newContract.setHoursPerWeek(data.getHours());
        newContract.setEmployee(employee);

        return this.contractRepository.save(newContract);
    }

    public List<Contract> findAll() {
        return this.contractRepository.findAll();
    }

    public Optional<Contract> findById(Integer id) {
        return this.contractRepository.findById(id);
    }
}