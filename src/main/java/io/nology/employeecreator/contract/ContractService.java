package io.nology.employeecreator.contract;

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

    public ContractService(ContractRepository contractRepository) {
        this.contractRepository = contractRepository;
    }

    public Contract create(@Valid CreateContractDTO data) throws ServiceValidationException, NotFoundException {
        Contract newContract = new Contract();
        newContract.setContractType(data.getContractType());
        newContract.setStartDate(data.getStartDate());
        newContract.setFinishDate(data.getFinishDate());
        newContract.setContractEmploymentType(data.getContractEmploymentType());
        newContract.setHoursPerWeek(data.getHoursPerWeek());

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
}