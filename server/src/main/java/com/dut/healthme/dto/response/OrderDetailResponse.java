package com.dut.healthme.dto.response;

import com.dut.healthme.annotation.json.JsonSnakeCaseNaming;
import com.dut.healthme.common.model.AbstractDTO;
import com.dut.healthme.entity.OrderDetail;
import com.dut.healthme.entity.Restaurant;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonSnakeCaseNaming
public class OrderDetailResponse extends AbstractDTO<OrderDetail> {
    private Long itemId;
    private String itemName;
    private Integer amount;
    private Double price;
    private String image;
    private Restaurant restaurant;

    @Override
    public AbstractDTO<OrderDetail> fromEntity(OrderDetail entity) {
        return OrderDetailResponse.builder()
            .itemId(entity.getItem().getId())
            .itemName(entity.getItem().getName())
            .amount(entity.getAmount())
            .price(entity.getItem().getPrice())
            .image(entity.getItem().getImage())
            .restaurant(entity.getItem().getRestaurant())
            .build();
    }
}
