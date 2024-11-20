package com.dut.healthme.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.dut.healthme.entity.Order;

public interface OrdersRepository extends JpaRepository<Order, Long> {
    @Query("SELECT o FROM Order o WHERE o.account.id = :accountId")
    List<Order> findByAccountId(@Param("accountId") Long accountId);
}
