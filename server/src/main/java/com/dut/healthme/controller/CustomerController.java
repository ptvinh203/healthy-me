package com.dut.healthme.controller;

import com.dut.healthme.common.model.AbstractResponse;
import com.dut.healthme.dto.request.HealthGoalRequest;
import com.dut.healthme.dto.response.CustomerInfoResponse;
import com.dut.healthme.service.CustomerService;
import io.lettuce.core.dynamic.annotation.Param;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/v1/customer")
@RequiredArgsConstructor
public class CustomerController {
    private final CustomerService customerService;
    @GetMapping()
    public ResponseEntity<AbstractResponse> getCustomerInfo(@Param("id") Long id) {
        var customerInfo = this.customerService.getCustomerInfo(id);
        return ResponseEntity.ok(AbstractResponse.successWithoutMeta(customerInfo));
    }

    @PutMapping("/{id}/health-goal")
    public ResponseEntity<AbstractResponse> updateHealthGoal(@PathVariable Long id,
                                                                 @RequestBody HealthGoalRequest request) {
        CustomerInfoResponse updatedCustomer = customerService.updateHealthGoal(id, request.getHealthGoal());
        return ResponseEntity.ok(AbstractResponse.successWithoutMeta(updatedCustomer));
    }
}
