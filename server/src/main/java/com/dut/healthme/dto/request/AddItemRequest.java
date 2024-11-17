package com.dut.healthme.dto.request;

import com.dut.healthme.annotation.json.JsonSnakeCaseNaming;
import com.dut.healthme.annotation.validation.ValidItemType;
import com.dut.healthme.entity.enums.ItemType;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
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
public class AddItemRequest {
    @NotNull(message = "Tên sản phẩm không được để trống")
    private String name;
    @NotNull(message = "Danh sách thành phần không được để trống")
    private List<String> ingredients;
    @NotNull(message = "Mô tả sản phẩm không được để trống")
    private String description;
    @NotNull(message = "Giá trị sản phẩm không được để trống")
    @Min(value = 1000, message = "Giá trị sản phẩm nhỏ nhất là 1000 VND")
    private Double price;
    @NotNull(message = "Lượng calo của sản phẩm không được để trống")
    private Double calo;
    @NotNull(message = "Loại sản phẩm không được để trống")
    @ValidItemType
    private ItemType type;
}
