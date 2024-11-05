package com.dut.healthme.dto.request;

import com.dut.healthme.annotation.json.JsonSnakeCaseNaming;
import com.dut.healthme.annotation.validation.ConfirmPassword;
import com.dut.healthme.annotation.validation.PasswordValidation;
import com.dut.healthme.entity.enums.Gender;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.List;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonSnakeCaseNaming
@ConfirmPassword(passwordField = "password")
public class RestaurantRegisterRequest {
    @NotBlank(message = "Email không được để trống")
    @Email(message = "Email không đúng định dạng")
    private String email;

    @PasswordValidation
    private String password;

    private String confirmPassword;

    @NotBlank(message = "Tên nhà hàng không được để trống")
    private String name;

    @NotBlank(message = "Địa chỉ nhà hàng không được để trống")
    private String address;
}
