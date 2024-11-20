package com.dut.healthme.repository;

import com.dut.healthme.entity.OrderDetail;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OrderDetailsRepository extends JpaRepository<OrderDetail, Long> {

    @Query("SELECT od FROM OrderDetail od WHERE od.order.account.id = :accountId ORDER BY od.order.createdAt DESC")
    List<OrderDetail> findAllByAccountId(Long accountId);

    @Query("SELECT od FROM OrderDetail od WHERE od.item.restaurant.account.id = :id ORDER BY od.order.createdAt DESC")
    Page<OrderDetail> findAllByRestaurantId(Long id, Pageable pageable);
}
