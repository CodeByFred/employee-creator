package io.nology.employeecreator.contract;

import jakarta.validation.constraints.*;
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
    private ContractEmploymentType contractEmploymentType;

    @NotNull
    @Min(0)
    private Integer hoursPerWeek;

    @NotNull
    private Integer employeeId;

    @AssertTrue(message = "Finish date must be after start date")
    public boolean isValidDateRange() {
        if (startDate == null || finishDate == null) {
            return true;
        }
        return finishDate.isAfter(startDate);
    }
}