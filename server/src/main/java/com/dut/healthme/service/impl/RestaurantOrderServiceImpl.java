package com.dut.healthme.service.impl;

import java.time.LocalDate;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.dut.healthme.dto.response.OrderDTO;
import com.dut.healthme.entity.enums.OrderStatus;
import com.dut.healthme.repository.OrdersRepository;
import com.dut.healthme.service.RestaurantOrderService;


@Service
public class RestaurantOrderServiceImpl implements RestaurantOrderService {
  private final OrdersRepository orderRepository;

  public RestaurantOrderServiceImpl(OrdersRepository orderRepository) {
    this.orderRepository = orderRepository;
  }

  @Override
  public Page<OrderDTO> getOrders(int page, int size, OrderStatus status) {
    Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());

    return orderRepository.findAll(pageable)
        .map(order -> OrderDTO.builder()
            .id(order.getId())
            .totalAmount(order.getTotalPrice())
            .createdAt(order.getCreatedAt().toLocalDateTime())
            .build());
  }
}
