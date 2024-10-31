package com.dut.healthme.controller;

import com.dut.healthme.annotation.auth.CurrentAccount;
import com.dut.healthme.annotation.auth.PreAuthorizeCustomer;
import com.dut.healthme.common.model.AbstractResponse;
import com.dut.healthme.dto.request.ShoppingCartRequest;
import com.dut.healthme.entity.Account;
import com.dut.healthme.service.ShoppingCartService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/v1/cart")
@PreAuthorizeCustomer
@RequiredArgsConstructor
public class ShoppingCartController {
    private final ShoppingCartService shoppingCartService;

    @GetMapping
    public ResponseEntity<AbstractResponse> getCarts(@CurrentAccount Account account) {
        return ResponseEntity.ok(AbstractResponse.successWithoutMeta(shoppingCartService.getCarts(account)));
    }

    @PostMapping
    public ResponseEntity<AbstractResponse> addCart(
        @CurrentAccount Account account,
        @Valid @RequestBody ShoppingCartRequest shoppingCartRequest
    ) {
        return ResponseEntity.ok(AbstractResponse.successWithoutMeta(shoppingCartService.addCart(account, shoppingCartRequest)));
    }

    @DeleteMapping("/{cartId}")
    public ResponseEntity<AbstractResponse> deleteCart(@CurrentAccount Account account, @PathVariable Long cartId) {
        shoppingCartService.deleteCart(account, cartId);
        return ResponseEntity.ok(AbstractResponse.successWithoutMetaAndData());
    }

    @PatchMapping("/{cartId}")
    public ResponseEntity<AbstractResponse> editItemQuantity(
        @CurrentAccount Account account,
        @PathVariable Long cartId,
        @Valid @RequestBody ShoppingCartRequest shoppingCartRequest
    ) {
        return ResponseEntity.ok(AbstractResponse.successWithoutMeta(shoppingCartService.editItemQuantity(account, cartId, shoppingCartRequest)));
    }
}
