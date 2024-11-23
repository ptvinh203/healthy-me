package com.dut.healthme.service;

import com.dut.healthme.dto.response.OrderDTO;
import com.dut.healthme.entity.Account;
import com.dut.healthme.entity.enums.OrderStatus;
import org.springframework.data.domain.Page;

public interface RestaurantOrderService {
    Page<OrderDTO> getOrders(Account restaurant, int page, int size, OrderStatus status);
}
