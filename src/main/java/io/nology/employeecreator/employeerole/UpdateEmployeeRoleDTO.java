package io.nology.employeecreator.employeerole;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class UpdateEmployeeRoleDTO {

    @Min(0)
    private Integer priorYearsOfExperience;

    @Enumerated(EnumType.STRING)
    private PromotionType promotionType;

    @Min(1)
    @Max(5)
    private Integer performanceRating;
}