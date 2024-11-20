package com.dut.healthme.controller;

import com.dut.healthme.annotation.auth.CurrentAccount;
import com.dut.healthme.annotation.auth.PreAuthorizeRestaurant;
import com.dut.healthme.dto.response.OrderDTO;
import com.dut.healthme.entity.Account;
import com.dut.healthme.entity.enums.OrderStatus;
import com.dut.healthme.service.RestaurantOrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/restaurant/orders")
@RequiredArgsConstructor
public class RestaurantOrderController {

    private final RestaurantOrderService orderService;

    @GetMapping
    @PreAuthorizeRestaurant
    public ResponseEntity<Page<OrderDTO>> getOrders(
        @CurrentAccount Account restaurant,
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "999") int size,
        @RequestParam(required = false) OrderStatus status
    ) {
        size = 999; // Set default in order to get all orders
        return ResponseEntity.ok(orderService.getOrders(restaurant, page, size, status));
    }
}
