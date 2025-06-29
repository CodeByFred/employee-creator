package io.nology.employeecreator.employee.dtos;

import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateEmployeeDTO {

    @NotBlank(message = "Field cannot be blank")
    private String givenName;

    @NotBlank(message = "Field cannot be blank")
    private String surname;

    @Email(message = "Invalid email format")
    private String email;

    @Pattern(regexp = "\\d{10}", message = "Phone must be 10 digits")
    private String phone;

    @Pattern(regexp = ".*\\S.*", message = "Address cannot be empty")
    private String address;
}