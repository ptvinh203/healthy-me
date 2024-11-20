package com.dut.healthme.dto.response;

import java.time.LocalDateTime;
import java.util.List;

import com.dut.healthme.entity.enums.OrderStatus;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class OrderDTO {
  private Long id;
  private String customerName;
  private String customerPhone;
  private String deliveryAddress;
  private Double totalAmount;
  private OrderStatus status;
  private LocalDateTime createdAt;
  private List<UpdateOrderStatusRequest> items;
}
