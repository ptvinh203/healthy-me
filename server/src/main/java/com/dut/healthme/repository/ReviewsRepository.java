package com.dut.healthme.repository;

import com.dut.healthme.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewsRepository extends JpaRepository<Review, Long> {
}
