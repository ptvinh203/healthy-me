package com.dut.healthme.dto.request;

import com.dut.healthme.annotation.json.JsonSnakeCaseNaming;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonSnakeCaseNaming
public class ShoppingCartRequest {
    @NotNull
    private Long itemId;

    @NotNull
    @Min(1)
    @Max(100)
    private Integer quantity;
}
