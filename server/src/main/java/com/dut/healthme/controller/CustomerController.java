package com.dut.healthme.controller;

import com.dut.healthme.annotation.auth.CurrentAccount;
import com.dut.healthme.common.model.AbstractResponse;
import com.dut.healthme.dto.request.HealthGoalRequest;
import com.dut.healthme.dto.response.CustomerInfoResponse;
import com.dut.healthme.entity.Account;
import com.dut.healthme.service.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/v1/customer")
@RequiredArgsConstructor
public class CustomerController {
    private final CustomerService customerService;

    @GetMapping("/{accountId}")
    public ResponseEntity<AbstractResponse> getCustomerInfo(@PathVariable Long accountId) {
        var customerInfo = this.customerService.getCustomerInfo(accountId);
        return ResponseEntity.ok(AbstractResponse.successWithoutMeta(customerInfo));
    }

    @PutMapping("/{accountId}/health-goal")
    public ResponseEntity<AbstractResponse> updateHealthGoal(@PathVariable Long accountId,
                                                             @RequestBody HealthGoalRequest request) {
        CustomerInfoResponse updatedCustomer = customerService.updateHealthGoal(accountId, request.getHealthGoal());
        return ResponseEntity.ok(AbstractResponse.successWithoutMeta(updatedCustomer));
    }

    @PutMapping("/{accountId}/activity-index/{index}")
    public ResponseEntity<AbstractResponse> updateHealthGoal(@PathVariable Long accountId,
                                                             @PathVariable short index) {
        CustomerInfoResponse updatedCustomer = customerService.updateActivityIndex(accountId, index);
        return ResponseEntity.ok(AbstractResponse.successWithoutMeta(updatedCustomer));
    }

    @GetMapping("/address")
    public ResponseEntity<AbstractResponse> getCustomerAddress(@CurrentAccount Account account) {
        return ResponseEntity.ok(AbstractResponse.successWithoutMeta(customerService.getCustomerAddress(account)));
    }

    @PutMapping("/address")
    public ResponseEntity<AbstractResponse> updateCustomerAddress(@CurrentAccount Account account,
                                                                  @RequestBody Map<String, String> request) {
        String newAddress = request.get("address");
        String updatedAddress = customerService.updateAddress(account, newAddress);
        return ResponseEntity.ok(AbstractResponse.successWithoutMeta(updatedAddress));
    }

}
