package com.dut.healthme.service;

import com.dut.healthme.dto.response.CustomerInfoResponse;
import com.dut.healthme.entity.enums.HealthGoal;

public interface CustomerService {
    CustomerInfoResponse getCustomerInfo(Long accountId);

    CustomerInfoResponse updateHealthGoal(Long customerId, HealthGoal healthGoalRequest);

    CustomerInfoResponse updateActivityIndex(Long customerId, short activityIndex);
}
