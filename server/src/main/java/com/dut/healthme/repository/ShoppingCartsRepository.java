package com.dut.healthme.repository;

import com.dut.healthme.entity.Account;
import com.dut.healthme.entity.ShoppingCart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ShoppingCartsRepository extends JpaRepository<ShoppingCart, Long> {
    List<ShoppingCart> findAllByAccount(Account account);

    @Query("SELECT c FROM ShoppingCart c WHERE c.account.id = :accountId AND c.item.id = :itemId AND c.deletedAt IS NULL")
    Optional<ShoppingCart> findByAccountIdAndItemId(Long accountId, Long itemId);
}
