package com.dut.healthme.annotation.validation.impl;
import com.dut.healthme.annotation.validation.ValidItemType;
import com.dut.healthme.entity.enums.ItemType;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.Arrays;

public class ItemTypeValidator implements ConstraintValidator<ValidItemType, ItemType> {

    @Override
    public boolean isValid(ItemType value, ConstraintValidatorContext context) {
        if (value == null) {
            return false; // Giá trị không được null
        }
        return Arrays.stream(ItemType.values())
            .anyMatch(type -> type.equals(value));
    }
}
