package com.dut.healthme.dto.request;

import com.dut.healthme.annotation.json.JsonSnakeCaseNaming;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonSnakeCaseNaming
public class OrderRequest {
    @NotNull
    private List<ShoppingCartRequest> items;

    @NotNull
    private String address;
}
