package io.nology.employeecreator.contract;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class UpdateContractDTO {

    @NotNull(message = "Finish date is required")
    @FutureOrPresent(message = "Finish date must be today or in the future")
    private LocalDate finishDate;
}
