package io.nology.employeecreator.contract;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

import java.time.LocalDate;

@Getter
public class CreateContractDTO {

    @NotNull
    private ContractType contractType;

    @NotNull
    @FutureOrPresent
    private LocalDate startDate;

    @Future
    private LocalDate finishDate;

    @NotNull
    private ContractEmploymentType employmentType;

    @NotNull
    @Min(0)
    private Integer hours;

    @NotNull
    private Integer employeeId;
}