package com.dut.healthme.dto.response;

import com.dut.healthme.annotation.json.JsonSnakeCaseNaming;
import com.dut.healthme.common.model.AbstractDTO;
import com.dut.healthme.entity.Customer;
import com.dut.healthme.entity.enums.Gender;
import com.dut.healthme.entity.enums.HealthGoal;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.sql.Timestamp;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@JsonSnakeCaseNaming
public class CustomerInfoResponse extends AbstractDTO<Customer> {
    private Double height;
    private Double weight;
    private Double bmi;
    private Double heartRate;
    private Double bloodGlucose;
    private Double bloodPressure;
    private Double chestMeasurement;
    private Double waistMeasurement;
    private Double hipsMeasurement;
    private HealthGoal healthGoal;
    private String bodyShape;
    private Double suggestedCalorieIntake;
    private Timestamp dateOfBirth;
    private Gender gender;

    @Override
    public CustomerInfoResponse fromEntity(Customer entity) {
        return CustomerInfoResponse.builder()
            .id(entity.getId())
            .createdAt(entity.getCreatedAt())
            .updatedAt(entity.getUpdatedAt())
            .height(entity.getHeight())
            .weight(entity.getWeight())
            .bmi(entity.getBmi())
            .heartRate(entity.getHeartRate())
            .bloodGlucose(entity.getBloodGlucose())
            .bloodPressure(entity.getBloodPressure())
            .chestMeasurement(entity.getChestMeasurement())
            .waistMeasurement(entity.getWaistMeasurement())
            .hipsMeasurement(entity.getHipsMeasurement())
            .healthGoal(entity.getHealthGoal())
            .dateOfBirth(entity.getDateOfBirth())
            .gender(entity.getGender())
            .build();
    }
}