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

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonSnakeCaseNaming
//@FieldMatch(first = "password", second = "confirmPassword", message = "Mật khẩu xác nhận không khớp")
@ConfirmPassword(passwordField = "password")
public class CustomerRegisterRequest {
    @NotBlank(message = "Email không được để trống")
    @Email(message = "Email không đúng định dạng")
    private String email;

    @PasswordValidation
    private String password;

    private String confirmPassword;

    @NotNull(message = "Ngày sinh không được để trống")
    private Timestamp dateOfBirth;

    @NotNull(message = "Giới tính không được để trống")
    private Gender gender = Gender.OTHER;

    @NotNull(message = "Chiều cao không được để trống")
    @DecimalMin(value = "0.5", inclusive = false, message = "Chiều cao phải lớn hơn 0.5m")
    @DecimalMax(value = "2.5", inclusive = true, message = "Chiều cao phải nhỏ hơn hoặc bằng 2.5m")
    private Double height;

    @NotNull(message = "Cân nặng không được để trống")
    @DecimalMin(value = "1.0", inclusive = false, message = "Cân nặng phải lớn hơn 1kg")
    @DecimalMax(value = "300.0", inclusive = true, message = "Cân nặng phải nhỏ hơn hoặc bằng 300kg")
    private Double weight;
}