package com.dut.healthme.dto.response;

import com.dut.healthme.annotation.json.JsonDateFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderDTO {
    private String customerName;
    private String customerPhone;
    private String deliveryAddress;
    private int totalAmount;
    @JsonDateFormat
    private Timestamp createdAt;
    private Long orderId;
    private Double totalPrice;
    private List<OrderDetailResponse> orderDetails;
}
