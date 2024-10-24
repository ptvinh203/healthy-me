package com.dut.healthme.dto.request;

import com.dut.healthme.entity.enums.HealthGoal;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class HealthGoalRequest {
    private HealthGoal healthGoal;
}
