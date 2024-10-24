package com.dut.healthme.dto.response;

import com.dut.healthme.annotation.json.JsonSnakeCaseNaming;
import com.dut.healthme.entity.Item;
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
public class ListRecommendResponse {
    private List<ItemResponse> listByEvaluate;
    private List<ItemResponse> listByCalo;
}
