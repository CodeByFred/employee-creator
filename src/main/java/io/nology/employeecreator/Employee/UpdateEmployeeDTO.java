package io.nology.employeecreator.employee;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateEmployeeDTO {

    @Pattern(regexp = ".*\\S.*", message = "Given name cannot be empty")
    private String givenName;

    @Pattern(regexp = ".*\\S.*", message = "Surname cannot be empty")
    private String surname;

    @Email(message = "Invalid email format")
    private String email;

    @Pattern(regexp = "\\d{10}", message = "Phone must be 10 digits")
    private String phone;

    @Pattern(regexp = ".*\\S.*", message = "Address cannot be empty")
    private String address;

    @Min(0)
    private Integer roleId;
}