package io.nology.employeecreator.contract;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.nology.employeecreator.employee.Employee;
import io.nology.employeecreator.employeerole.EmployeeRole;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "contracts")
public class Contract {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "employee_id", nullable = false)
    @JsonBackReference
    private Employee employee;

    @OneToMany(
            mappedBy = "contract",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @JsonManagedReference
    private List<EmployeeRole> employeeRoles = new ArrayList<>();

    @Enumerated(EnumType.STRING)
    private ContractType contractType;

    private LocalDate startDate;

    private LocalDate finishDate;

    @Enumerated(EnumType.STRING)
    private ContractEmploymentType contractEmploymentType;

    private Integer hoursPerWeek;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @PrePersist
    public void onCreate() {
        LocalDateTime timestamp = LocalDateTime.now();
        this.createdAt = timestamp;
        this.updatedAt = timestamp;
    }

    @PreUpdate
    public void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    // virtual field but on JSON
    @JsonProperty("hasActiveContract")
    @Transient
    public boolean hasActiveContract() {
        LocalDate today = LocalDate.now();
        // startDate is required, finishDate is optional
        return startDate != null && !startDate.isAfter(today) && (finishDate == null || !finishDate.isBefore(today));
    }
}