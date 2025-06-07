package io.nology.employeecreator.employee;

import jakarta.validation.constraints.*;
import lombok.Getter;

@Getter
public class CreateEmployeeDTO {

    @NotBlank
    private String givenName;

    @NotBlank
    private String surname;

    @NotNull
    @Email(message = "Invalid email format")
    private String email;

    @NotNull
    private String phone;

    @NotBlank
    private String address;

    @NotNull
    @Min(0)
    private Integer roleId;
}