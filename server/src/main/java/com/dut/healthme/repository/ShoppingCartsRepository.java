package com.dut.healthme.repository;

import com.dut.healthme.entity.ShoppingCart;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ShoppingCartsRepository extends JpaRepository<ShoppingCart, Long> {
}
