package com.dut.healthme.service;

import com.dut.healthme.dto.request.OrderRequest;
import com.dut.healthme.dto.request.ShoppingCartRequest;
import com.dut.healthme.entity.Account;

import java.util.Map;

public interface OrderService {
    void addOrder(Account account, OrderRequest orderRequest);
}
