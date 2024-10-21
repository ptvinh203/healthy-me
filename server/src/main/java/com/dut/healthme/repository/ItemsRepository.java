package com.dut.healthme.repository;

import com.dut.healthme.dto.response.ItemResponse;
import com.dut.healthme.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ItemsRepository extends JpaRepository<Item, Long> {
    @Query("SELECT new com.dut.healthme.dto.response.ItemResponse(i) FROM Item i JOIN i.reviews r GROUP BY i ORDER BY AVG(r.evaluate) DESC")
    List<ItemResponse> findAllItemsOrderByAverageReview();

    @Query("SELECT new com.dut.healthme.dto.response.ItemResponse(i) FROM Item i ORDER BY ABS(i.calo * 3 - :caloIn) ASC")
    List<ItemResponse> findItemsByCaloApproximation(@Param("caloIn") double caloIn);

    @Query("SELECT new com.dut.healthme.dto.response.ItemResponse(i) FROM Item i WHERE i.id = :id")
    ItemResponse findItemById(Long id);
}
