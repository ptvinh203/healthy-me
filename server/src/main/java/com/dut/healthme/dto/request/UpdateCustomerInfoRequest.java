package com.dut.healthme.dto.request;

import com.dut.healthme.annotation.json.JsonSnakeCaseNaming;
import com.dut.healthme.entity.Account;
import com.dut.healthme.entity.Customer;
import com.dut.healthme.entity.enums.Gender;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonSnakeCaseNaming
public class UpdateCustomerInfoRequest {
    @NotNull
    private String address;
    @NotNull
    private String phone;
    @NotNull
    private String name;
    @NotNull
    private Timestamp dateOfBirth;
    @NotNull
    private Gender gender;
    @NotNull
    @Min(0)
    private double height;
    @NotNull
    @Min(0)
    private double weight;
    @NotNull
    @Min(0)
    private double heartRate;
    @NotNull
    @Min(0)
    private double bloodGlucose;
    @NotNull
    @Min(0)
    private double chestMeasurement;
    @NotNull
    @Min(0)
    private double waistMeasurement;
    @NotNull
    @Min(0)
    private double hipsMeasurement;
    @NotNull
    @Min(0)
    private double bloodPressure;

    public Account toAccountEntity(Account account) {
        account.setName(name);
        return account;
    }

    public Customer toCustomerEntity(Customer customer) {
        customer.setAddress(address);
        customer.setPhoneNumber(phone);
        customer.setDateOfBirth(dateOfBirth);
        customer.setGender(gender);
        customer.setHeight(height);
        customer.setWeight(weight);
        customer.setHeartRate(heartRate);
        customer.setBloodGlucose(bloodGlucose);
        customer.setChestMeasurement(chestMeasurement);
        customer.setWaistMeasurement(waistMeasurement);
        customer.setHipsMeasurement(hipsMeasurement);
        customer.setBloodPressure(bloodPressure);
        return customer;
    }
}
