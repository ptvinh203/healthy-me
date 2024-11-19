package com.dut.healthme.dto.response;

import com.dut.healthme.annotation.json.JsonSnakeCaseNaming;
import com.dut.healthme.common.model.AbstractDTO;
import com.dut.healthme.entity.Restaurant;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@JsonSnakeCaseNaming
public class RestaurantResponse extends AbstractDTO<Restaurant> {
    private String address;
    private String information;
    private List<String> certification;
    private AccountInfo account;

    @Override
    public RestaurantResponse fromEntity(Restaurant entity) {
        return RestaurantResponse.builder()
            .id(entity.getId())
            .address(entity.getAddress())
            .information(entity.getInformation())
            .certification(entity.getCertification())
            .account(new AccountInfo().fromEntity(entity.getAccount()))
            .createdAt(entity.getCreatedAt())
            .updatedAt(entity.getUpdatedAt())
            .build();
    }
}
