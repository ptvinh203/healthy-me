package com.dut.healthme.service.impl;

import com.dut.healthme.common.constant.ErrorMessageConstants;
import com.dut.healthme.common.exception.BadRequestException;
import com.dut.healthme.dto.request.OrderRequest;
import com.dut.healthme.dto.request.ShoppingCartRequest;
import com.dut.healthme.dto.response.ShoppingCartResponse;
import com.dut.healthme.entity.*;
import com.dut.healthme.repository.*;
import com.dut.healthme.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {
    private final CustomersRepository customerRepository;
    private final OrdersRepository ordersRepository;
    private final OrderDetailsRepository orderDetailsRepository;
    private final ItemsRepository itemsRepository;
    private final ShoppingCartsRepository shoppingCartsRepository;

    @Override
    @Transactional
    public void addOrder(Account account, OrderRequest orderRequest) {
        Order order = Order.builder()
            .account(account)
            .totalPrice(0.0)
            .build();
        ordersRepository.save(order);

        double totalPrice = 0.0;

        for (ShoppingCartRequest cartItem : orderRequest.getItems()) {
            Item item = itemsRepository.findById(cartItem.getItemId())
                .orElseThrow(() -> new BadRequestException(ErrorMessageConstants.ITEM_NOT_FOUND));

            double itemTotalPrice = item.getPrice() * cartItem.getQuantity();
            totalPrice += itemTotalPrice;

            OrderDetail orderDetail = OrderDetail.builder()
                .order(order)
                .item(item)
                .amount(cartItem.getQuantity())
                .build();

            orderDetailsRepository.save(orderDetail);

            ShoppingCart shoppingCart = shoppingCartsRepository.findByAccountIdAndItemId(account.getId(), item.getId())
                .orElseThrow(() -> new BadRequestException(ErrorMessageConstants.CART_NOT_FOUND));

            shoppingCartsRepository.delete(shoppingCart);
        }

        order.setTotalPrice(totalPrice);
        ordersRepository.save(order);
    }
}
