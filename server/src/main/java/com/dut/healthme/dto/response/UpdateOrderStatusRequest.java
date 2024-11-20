package com.dut.healthme.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UpdateOrderStatusRequest {
    private Long itemId;
    private String itemName;
    private Integer quantity;
    private Double price;
    private String note;
}
