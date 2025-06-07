package io.nology.employeecreator.employee;

import io.nology.employeecreator.role.Role;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;

@Entity
@Table(name = "employees")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column
    private String givenName;

    @Column
    private String surname;

    @Column
    @Email
    private String email;

    @Column
    private String phone;

    @Column
    private String address;

    @ManyToOne()
    @JoinColumn(name = "roleId", nullable = false)
    @Enumerated(EnumType.STRING)
    private Role role;

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getGivenName() {
        return givenName;
    }

    public void setGivenName(String givenName) {
        this.givenName = givenName;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }
}
