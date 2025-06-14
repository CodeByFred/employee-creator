package io.nology.employeecreator.contract;

import io.nology.employeecreator.exceptions.NotFoundException;
import io.nology.employeecreator.exceptions.ServiceValidationException;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Slf4j
@RestController
@RequestMapping("/contracts")
public class ContractController {

    private final ContractService contractService;

    public ContractController(ContractService contractService) {
        this.contractService = contractService;
    }

    @PostMapping
    public ResponseEntity<Contract> createContract(@Valid @RequestBody CreateContractDTO data) throws ServiceValidationException, NotFoundException {
        log.info("POST /contracts - Creating contract for employee id {}", data.getEmployeeId());
        Contract saved = this.contractService.create(data);
        log.info("Contract created with id {}", saved.getId());
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @GetMapping
    public ResponseEntity<List<Contract>> getAll() {
        log.debug("GET /contracts - Fetching all contracts");
        return ResponseEntity.ok(this.contractService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Contract> getById(@PathVariable Integer id) throws NotFoundException {
        log.debug("GET /contracts/id - Fetching contract with id {}", id);
        Optional<Contract> foundContract = this.contractService.findById(id);
        if (foundContract.isPresent()) {
            log.info("Contract {} found", id);
            return ResponseEntity.ok(foundContract.get());
        }
        log.warn("Contract {} not found", id);
        throw new NotFoundException("Contract " + id + " does not exist");
    }
}