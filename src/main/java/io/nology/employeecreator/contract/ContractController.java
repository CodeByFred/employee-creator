package io.nology.employeecreator.contract;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/contracts")
public class ContractController {

    private final ContractService contractService;

    public ContractController(ContractService contractService) {
        this.contractService = contractService;
    }

    // create contract
    @PostMapping
    public ResponseEntity<Contract> createContract(@Valid @RequestBody CreateContractDTO data) {
        Contract saved = this.contractService.create(data);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    // get all contracts
    @GetMapping
    public ResponseEntity<List<Contract>> getAll() {
        return ResponseEntity.ok(this.contractService.findAll());
    }

    // get contract by id
    @GetMapping("/{id}")
    public ResponseEntity<Contract> getById(@PathVariable Integer id) {
        Optional<Contract> foundContract = this.contractService.findById(id);
        if(foundContract.isPresent()) {
            return ResponseEntity.ok(foundContract.get());
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Contract " + id + " does not exist");
    }
}