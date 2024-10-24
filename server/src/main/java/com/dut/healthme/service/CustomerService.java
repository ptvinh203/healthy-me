package com.dut.healthme.service;

import com.dut.healthme.dto.response.CustomerInfoResponse;
import com.dut.healthme.entity.enums.HealthGoal;

public interface CustomerService {
    CustomerInfoResponse getCustomerInfo(Long accountId);

    CustomerInfoResponse updateHealthGoal(Long accountId, HealthGoal healthGoalRequest);

    CustomerInfoResponse updateActivityIndex(Long accountId, short activityIndex);
}
