package io.nology.employeecreator.contract;

import jakarta.validation.constraints.*;
import lombok.Getter;

import java.time.LocalDate;

@Getter
public class CreateContractDTO {

    @NotNull(message = "Contract type is required")
    private ContractType contractType;

    @NotNull(message = "Start date is required")
    @FutureOrPresent(message = "Message start date must be today or in the future")
    private LocalDate startDate;

    @Future(message = "Finish date must be in the future")
    private LocalDate finishDate;

    @NotNull(message = "Employment type is required")
    private ContractEmploymentType contractEmploymentType;

    @NotNull
    @Min(value = 1, message = "1 is the minimum number of hours per week")
    @Max(value = 38, message = "38 is the maximum number of hours per week")
    private Integer hoursPerWeek;

    @NotNull
    private Long employeeId;

    @AssertTrue(message = "Finish date must be after start date")
    public boolean isValidDateRange() {
        if (startDate == null || finishDate == null) {
            return true;
        }
        return finishDate.isAfter(startDate);
    }

    @AssertTrue(message = "Full-time contracts must be exactly 38 hours per week")
    public boolean isValidHoursForEmploymentType() {
        if (contractEmploymentType == null || hoursPerWeek == null) {
            return true;
        }

        if (contractEmploymentType == ContractEmploymentType.FULL_TIME) {
            return hoursPerWeek == 38;
        }

        return true;
    }
}