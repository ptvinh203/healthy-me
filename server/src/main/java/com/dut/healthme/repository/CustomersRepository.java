package com.dut.healthme.repository;

import com.dut.healthme.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomersRepository extends JpaRepository<Customer, Long> {
    Customer findByAccountId(Long accountId);
}
