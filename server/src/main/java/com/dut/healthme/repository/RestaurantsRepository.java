package com.dut.healthme.repository;

import com.dut.healthme.entity.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RestaurantsRepository extends JpaRepository<Restaurant, Long> {
}
