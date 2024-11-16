package com.dut.healthme.annotation.validation;

import com.dut.healthme.annotation.validation.impl.ItemTypeValidator;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = ItemTypeValidator.class)
@Target({ElementType.FIELD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
public @interface ValidItemType {
    String message() default "Loại sản phẩm không đúng";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
