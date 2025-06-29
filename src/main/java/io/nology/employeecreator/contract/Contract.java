package io.nology.employeecreator.contract;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "contracts")
public class Contract {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

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