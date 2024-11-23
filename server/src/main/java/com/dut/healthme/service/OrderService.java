package com.dut.healthme.service;

import com.dut.healthme.dto.request.OrderRequest;
import com.dut.healthme.dto.response.OrderResponse;
import com.dut.healthme.entity.Account;

import java.util.List;

public interface OrderService {
    void addOrder(Account account, OrderRequest orderRequest);

    List<OrderResponse> getOrdersByAccountId(Account account);
}
