package com.dut.healthme.service;

import com.dut.healthme.dto.request.ShoppingCartRequest;
import com.dut.healthme.dto.response.ShoppingCartResponse;
import com.dut.healthme.entity.Account;

import java.util.List;

public interface ShoppingCartService {
    ShoppingCartResponse addCart(Account account, ShoppingCartRequest request);

    List<ShoppingCartResponse> getCarts(Account account);

    void deleteCart(Account account, Long cartId);

    ShoppingCartResponse editItemQuantity(Account account, Long cartId, ShoppingCartRequest request);
}
