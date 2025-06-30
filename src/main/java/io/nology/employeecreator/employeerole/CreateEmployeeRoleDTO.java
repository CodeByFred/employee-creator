package io.nology.employeecreator.employeerole;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

@Getter
public class CreateEmployeeRoleDTO {

    @NotNull
    private Long employeeId;

    @NotNull
    private Long roleId;

    @NotNull
    private Long contractId;

    @Min(0)
    private Integer priorYearsOfExperience;

    @Enumerated(EnumType.STRING)
    private PromotionType promotionType;

    @Min(0)
    private Integer performanceRating;
}
