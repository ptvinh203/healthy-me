package com.dut.healthme.entity;

import com.dut.healthme.common.model.AbstractEntity;
import com.dut.healthme.entity.enums.Gender;
import com.dut.healthme.entity.enums.HealthGoal;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.JdbcType;
import org.hibernate.dialect.PostgreSQLEnumJdbcType;

import java.sql.Timestamp;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@Entity
@Table(name = "customers")
public class Customer extends AbstractEntity {
    @Column(nullable = false)
    private Timestamp dateOfBirth;

    private String phoneNumber;

    private String address;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    @JdbcType(PostgreSQLEnumJdbcType.class)
    @Builder.Default
    private Gender gender = Gender.OTHER;

    @Column(nullable = false)
    private Double height;

    @Column(nullable = false)
    private Double weight;

    @OneToOne
    @JoinColumn(name = "account_id", referencedColumnName = "id")
    private Account account;

    private Double bmi;
    private Double heartRate;
    private Double bloodGlucose;
    private Double chestMeasurement;
    private Double waistMeasurement;
    private Double hipsMeasurement;

    @Enumerated(EnumType.STRING)
    @JdbcType(PostgreSQLEnumJdbcType.class)
    private HealthGoal healthGoal;
}
