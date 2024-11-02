package com.dut.healthme.annotation.validation.impl;

import com.dut.healthme.annotation.validation.ConfirmPassword;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.lang.reflect.Field;

public class ConfirmPasswordValidator implements ConstraintValidator<ConfirmPassword, Object> {
    private String passwordField;

    @Override
    public void initialize(ConfirmPassword constraintAnnotation) {
        this.passwordField = constraintAnnotation.passwordField();
    }

    @Override
    public boolean isValid(Object obj, ConstraintValidatorContext context) {
        if (obj == null) {
            return true; // Hoặc false tùy thuộc vào yêu cầu của bạn
        }
        try {
            Field passwordField = obj.getClass().getDeclaredField(this.passwordField);
            Field confirmPasswordField = obj.getClass().getDeclaredField("confirmPassword");

            passwordField.setAccessible(true);
            confirmPasswordField.setAccessible(true);

            String password = (String) passwordField.get(obj);
            String confirmPassword = (String) confirmPasswordField.get(obj);

            return password != null && password.equals(confirmPassword);
        } catch (NoSuchFieldException | IllegalAccessException e) {
            // Xử lý ngoại lệ nếu cần
            return false;
        }
    }
}
