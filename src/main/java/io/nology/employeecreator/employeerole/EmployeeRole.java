package io.nology.employeecreator.employeerole;

import io.nology.employeecreator.contract.Contract;
import io.nology.employeecreator.employee.Employee;
import io.nology.employeecreator.role.Role;
import jakarta.persistence.*;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
@Entity
@Table(name = "employee_roles",
        uniqueConstraints = @UniqueConstraint(columnNames = {"employee_id", "role_id", "contract_id"}))
public class EmployeeRole {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "employee_id", nullable = false)
    private Employee employee;

    @ManyToOne
    @JoinColumn(name = "role_id", nullable = false)
    private Role role;

    @ManyToOne
    @JoinColumn(name = "contract_id", nullable = false)
    private Contract contract;

    private Integer priorYearsOfExperience;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PromotionType promotionType = PromotionType.NONE;

    @Column(nullable = false)
    private Integer performanceRating = 0;

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
}
