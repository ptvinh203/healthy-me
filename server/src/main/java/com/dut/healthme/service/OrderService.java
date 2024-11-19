package com.dut.healthme.service;

import com.dut.healthme.dto.request.OrderRequest;
import com.dut.healthme.dto.request.ShoppingCartRequest;
import com.dut.healthme.dto.response.OrderResponse;
import com.dut.healthme.entity.Account;
import com.dut.healthme.entity.Order;
import com.dut.healthme.entity.OrderDetail;

import java.util.List;
import java.util.Map;

public interface OrderService {
    void addOrder(Account account, OrderRequest orderRequest);
    List<OrderResponse> getOrdersByAccountId(Account account);
}
