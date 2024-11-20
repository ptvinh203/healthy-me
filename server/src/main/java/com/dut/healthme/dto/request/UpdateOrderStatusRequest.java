package com.dut.healthme.dto.request;

import com.dut.healthme.entity.enums.OrderStatus;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UpdateOrderStatusRequest {
  @NotNull
  private OrderStatus status;
}
