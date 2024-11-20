package com.dut.healthme.service.impl;

import com.dut.healthme.dto.response.OrderDTO;
import com.dut.healthme.dto.response.OrderDetailResponse;
import com.dut.healthme.entity.Account;
import com.dut.healthme.entity.Customer;
import com.dut.healthme.entity.Order;
import com.dut.healthme.entity.OrderDetail;
import com.dut.healthme.entity.enums.OrderStatus;
import com.dut.healthme.repository.CustomersRepository;
import com.dut.healthme.repository.OrderDetailsRepository;
import com.dut.healthme.service.RestaurantOrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class RestaurantOrderServiceImpl implements RestaurantOrderService {
    private final OrderDetailsRepository orderDetailsRepository;
    private final CustomersRepository customersRepository;

    @Override
    public Page<OrderDTO> getOrders(Account restaurant, int page, int size, OrderStatus status) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        var orderDetails = orderDetailsRepository.findAllByRestaurantId(restaurant.getId(), pageable);

        // Map to Order

        Map<Order, List<OrderDetail>> orderMap = orderDetails.getContent().stream()
            .collect(Collectors.groupingBy(OrderDetail::getOrder));

        List<OrderDTO> result = orderMap.entrySet().stream()
            .map(entry -> {
                Order order = entry.getKey();
                Customer customer = customersRepository.findByAccountId(order.getAccount().getId());
                List<OrderDetailResponse> details = entry.getValue().stream()
                    .map(orderDetail -> new OrderDetailResponse().fromEntity(orderDetail))
                    .collect(Collectors.toList());

                return OrderDTO.builder()
                    .orderId(order.getId())
                    .totalPrice(order.getTotalPrice())
                    .orderDetails(details)
                    .createdAt(order.getCreatedAt())
                    .totalAmount(details.size())
                    .customerName(customer.getAccount().getName())
                    .customerPhone(customer.getPhoneNumber())
                    .deliveryAddress(customer.getAddress())
                    .build();
            }).toList();

        return new PageImpl<>(result, pageable, orderDetails.getTotalElements());
    }
}
