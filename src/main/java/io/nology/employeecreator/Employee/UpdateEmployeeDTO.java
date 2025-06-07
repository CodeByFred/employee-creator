package io.nology.employeecreator.employee;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateEmployeeDTO {

    private String givenName;

    private String surname;

    @Email(message = "Invalid email format")
    private String email;

    private String phone;

    private String address;

    @Min(0)
    private Integer roleId;
}