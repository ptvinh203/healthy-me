package com.dut.healthme.repository;

import com.dut.healthme.entity.OrderDetail;
import com.dut.healthme.entity.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface OrderDetailsRepository extends JpaRepository<OrderDetail, Long> {

    @Query("SELECT od FROM OrderDetail od WHERE od.order.account.id = :accountId")
    List<OrderDetail> findAllByAccountId(Long accountId);

}
