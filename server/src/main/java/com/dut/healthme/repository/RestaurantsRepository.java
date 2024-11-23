package com.dut.healthme.repository;

import com.dut.healthme.entity.Restaurant;
import com.dut.healthme.entity.enums.RestaurantStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface RestaurantsRepository extends JpaRepository<Restaurant, Long> {
    @Query("SELECT r.status FROM Restaurant r WHERE r.account.id = ?1")
    Optional<RestaurantStatus> getApprovedStatusByAccountId(Long accountId);

    Optional<Restaurant> findByaccountId(Long accountId);

    @Query("""
        SELECT r
        FROM Restaurant r
        WHERE r.status IN :statuses
        ORDER BY r.createdAt DESC
        """)
    List<Restaurant> findByStatusIn(List<RestaurantStatus> statuses);
}
