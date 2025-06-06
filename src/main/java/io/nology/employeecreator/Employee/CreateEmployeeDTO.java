package io.nology.employeecreator.Employee;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;

public class CreateEmployeeDTO {

    public CreateEmployeeDTO(String address, String email, String givenName, String phone, String surname) {
        this.address = address;
        this.email = email;
        this.givenName = givenName;
        this.phone = phone;
        this.surname = surname;
    }

    @NotNull
    private String givenName;

    @NotNull
    private String surname;

    @NotNull
    @Email
    private String email;

    @NotNull
    private String phone;

    @NotNull
    private String address;

    public String getAddress() {
        return address;
    }

    public String getEmail() {
        return email;
    }

    public String getGivenName() {
        return givenName;
    }

    public String getPhone() {
        return phone;
    }

    public String getSurname() {
        return surname;
    }
}
