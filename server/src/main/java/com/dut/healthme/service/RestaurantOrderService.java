package com.dut.healthme.service;

import java.time.LocalDate;

import org.springframework.data.domain.Page;

import com.dut.healthme.dto.response.OrderDTO;
import com.dut.healthme.entity.enums.OrderStatus;

public interface RestaurantOrderService {
  Page<OrderDTO> getOrders(int page, int size, OrderStatus status);
}
