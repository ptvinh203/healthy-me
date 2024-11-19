package com.dut.healthme.service.impl;

import com.dut.healthme.common.constant.ErrorMessageConstants;
import com.dut.healthme.common.exception.BadRequestException;
import com.dut.healthme.dto.request.ShoppingCartRequest;
import com.dut.healthme.dto.response.ShoppingCartResponse;
import com.dut.healthme.entity.Account;
import com.dut.healthme.entity.ShoppingCart;
import com.dut.healthme.repository.ItemsRepository;
import com.dut.healthme.repository.ShoppingCartsRepository;
import com.dut.healthme.service.ShoppingCartService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ShoppingCartServiceImpl implements ShoppingCartService {
    private final ShoppingCartsRepository shoppingCartsRepository;
    private final ItemsRepository itemsRepository;

    @Override
    public ShoppingCartResponse addCart(Account account, ShoppingCartRequest request) {
        var cart = shoppingCartsRepository.findByAccountIdAndItemId(account.getId(), request.getItemId()).orElse(null);
        if (cart != null) {
            cart.setAmount(cart.getAmount() + request.getQuantity());
            cart = shoppingCartsRepository.save(cart);
            return new ShoppingCartResponse().fromEntity(cart);
        }

        var item = itemsRepository.findById(request.getItemId())
            .orElseThrow(() -> new BadRequestException(ErrorMessageConstants.ITEM_NOT_FOUND));
        cart = shoppingCartsRepository.save(ShoppingCart.builder()
            .account(account)
            .item(item)
            .amount(request.getQuantity())
            .build());
        return new ShoppingCartResponse().fromEntity(cart);
    }

    @Override
    public List<ShoppingCartResponse> getCarts(Account account) {
        var carts = shoppingCartsRepository.findAllByAccount(account);
        return carts.stream().map(e -> new ShoppingCartResponse().fromEntity(e)).toList();
    }

    @Override
    public ShoppingCartResponse getCartById(Account account, Long cartId) {
        var cart = shoppingCartsRepository.findById(cartId)
            .orElseThrow(() -> new BadRequestException(ErrorMessageConstants.CART_NOT_FOUND));
        return new ShoppingCartResponse().fromEntity(cart);
    }

    @Override
    public void deleteCart(Account account, Long cartId) {
        var cart = shoppingCartsRepository.findById(cartId)
            .orElseThrow(() -> new BadRequestException(ErrorMessageConstants.CART_NOT_FOUND));

        if (!cart.getAccount().getId().equals(account.getId()))
            throw new BadRequestException(ErrorMessageConstants.ACTION_IS_NOT_ALLOWED);

        shoppingCartsRepository.delete(cart);
    }

    @Override
    public ShoppingCartResponse editItemQuantity(Account account, Long cartId, ShoppingCartRequest request) {
        var cart = shoppingCartsRepository.findById(cartId)
            .orElseThrow(() -> new BadRequestException(ErrorMessageConstants.CART_NOT_FOUND));

        if (!cart.getAccount().getId().equals(account.getId()))
            throw new BadRequestException(ErrorMessageConstants.ACTION_IS_NOT_ALLOWED);

        cart.setAmount(request.getQuantity());
        cart = shoppingCartsRepository.save(cart);
        return new ShoppingCartResponse().fromEntity(cart);
    }
}
