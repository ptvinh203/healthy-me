package com.dut.healthme.service;

import com.dut.healthme.dto.request.UpdateCustomerInfoRequest;
import com.dut.healthme.dto.response.AccountInfo;
import com.dut.healthme.dto.response.CustomerInfoResponse;
import com.dut.healthme.entity.Account;
import com.dut.healthme.entity.enums.HealthGoal;
import org.springframework.web.multipart.MultipartFile;

public interface CustomerService {
    CustomerInfoResponse getCustomerInfo(Long accountId);

    CustomerInfoResponse updateHealthGoal(Long accountId, HealthGoal healthGoalRequest);

    CustomerInfoResponse updateActivityIndex(Long accountId, short activityIndex);

    CustomerInfoResponse updateInfo(Account account, UpdateCustomerInfoRequest request);

    AccountInfo updateAvatar(Account account, MultipartFile avatar);

    String getCustomerAddress(Account account);

    String updateAddress(Account account, String address);
}
