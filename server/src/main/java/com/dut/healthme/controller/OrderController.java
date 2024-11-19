package com.dut.healthme.controller;

import com.dut.healthme.annotation.auth.CurrentAccount;
import com.dut.healthme.annotation.auth.PreAuthorizeCustomer;
import com.dut.healthme.common.model.AbstractResponse;
import com.dut.healthme.dto.request.OrderRequest;
import com.dut.healthme.entity.Account;
import com.dut.healthme.service.OrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/v1/order")
@PreAuthorizeCustomer
@RequiredArgsConstructor
public class OrderController {
    private final OrderService orderService;

    @PostMapping
    public ResponseEntity<AbstractResponse> order(
        @CurrentAccount Account account,
        @Valid @RequestBody OrderRequest orderRequest
    ) {
        orderService.addOrder(account, orderRequest);
        return ResponseEntity.ok(AbstractResponse.successWithoutMetaAndData());
    }

    @GetMapping
    public ResponseEntity<AbstractResponse> history(@CurrentAccount Account account) {
        return ResponseEntity.ok(AbstractResponse.successWithoutMeta(orderService.getOrdersByAccountId(account)));
    }
}
