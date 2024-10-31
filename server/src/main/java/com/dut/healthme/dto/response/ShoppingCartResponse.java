package com.dut.healthme.dto.response;

import com.dut.healthme.annotation.json.JsonSnakeCaseNaming;
import com.dut.healthme.common.model.AbstractDTO;
import com.dut.healthme.entity.ShoppingCart;
import com.dut.healthme.entity.enums.CartState;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@JsonSnakeCaseNaming
public class ShoppingCartResponse extends AbstractDTO<ShoppingCart> {
    private ItemResponse item;
    private Integer quantity;
    private CartState state;

    @Override
    public ShoppingCartResponse fromEntity(ShoppingCart entity) {
        return ShoppingCartResponse.builder()
            .id(entity.getId())
            .item(new ItemResponse(entity.getItem()))
            .quantity(entity.getAmount())
            .state(entity.getState())
            .createdAt(entity.getCreatedAt())
            .updatedAt(entity.getUpdatedAt())
            .build();
    }
}
