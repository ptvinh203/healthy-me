package com.dut.healthme.service.impl;

import com.dut.healthme.common.constant.ErrorMessageConstants;
import com.dut.healthme.common.exception.BadRequestException;
import com.dut.healthme.dto.request.OrderRequest;
import com.dut.healthme.dto.request.ShoppingCartRequest;
import com.dut.healthme.dto.response.OrderDetailResponse;
import com.dut.healthme.dto.response.OrderResponse;
import com.dut.healthme.dto.response.ShoppingCartResponse;
import com.dut.healthme.entity.*;
import com.dut.healthme.entity.enums.RestaurantStatus;
import com.dut.healthme.repository.*;
import com.dut.healthme.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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

    @Override
    public List<OrderResponse> getOrdersByAccountId(Account account) {
        List<OrderDetail> orderDetails = orderDetailsRepository.findAllByAccountId(account.getId());

        Map<Order, List<OrderDetail>> orderMap = orderDetails.stream()
            .collect(Collectors.groupingBy(OrderDetail::getOrder));

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

        return orderMap.entrySet().stream()
            .sorted((entry1, entry2) -> entry2.getKey().getCreatedAt().compareTo(entry1.getKey().getCreatedAt()))
            .map(entry -> {
                Order order = entry.getKey();
                List<OrderDetailResponse> details = entry.getValue().stream()
                    .map(orderDetail -> OrderDetailResponse.builder()
                        .itemId(orderDetail.getItem().getId())
                        .itemName(orderDetail.getItem().getName())
                        .amount(orderDetail.getAmount())
                        .price(orderDetail.getItem().getPrice())
                        .image(orderDetail.getItem().getImage())
                        .restaurant(orderDetail.getItem().getRestaurant())
                        .build())
                    .collect(Collectors.toList());

                String formattedCreatedAt = order.getCreatedAt().toLocalDateTime().format(formatter);

                return OrderResponse.builder()
                    .orderId(order.getId())
                    .totalPrice(order.getTotalPrice())
                    .orderDetails(details)
                    .createdAtFormatted(formattedCreatedAt)
                    .build();
            }).collect(Collectors.toList());
    }
}
