package com.dut.healthme.dto.response;

import com.dut.healthme.annotation.json.JsonSnakeCaseNaming;
import com.dut.healthme.entity.Item;
import com.dut.healthme.entity.Restaurant;
import com.dut.healthme.entity.Review;
import com.dut.healthme.entity.enums.ItemType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.util.List;
@Getter
@Setter
@NoArgsConstructor
@SuperBuilder
@JsonSnakeCaseNaming
public class ItemResponse {
    private Long id;
    private String name;
    private List<String> ingredients;
    private String description;
    private Double price;
    private String image;
    private Double calo;
    private ItemType type;
    private Restaurant restaurant;
    private List<Review> reviews;

    public ItemResponse(Item item) {
        this.id = item.getId();
        this.name = item.getName();
        this.description = item.getDescription();
        this.price = item.getPrice();
        this.image = item.getImage();
        this.calo = item.getCalo();
        this.type = item.getType();
        // Initialize and set restaurant details
        if (item.getRestaurant() != null) {
            this.restaurant = new Restaurant();
            this.restaurant.setId(item.getRestaurant().getId());
            this.restaurant.setAddress(item.getRestaurant().getAddress());
            this.restaurant.setInformation(item.getRestaurant().getInformation());
            this.restaurant.setCertification(item.getRestaurant().getCertification());
            this.restaurant.setAccount(item.getRestaurant().getAccount());
            this.restaurant.setCreatedAt(item.getRestaurant().getCreatedAt());
            this.restaurant.setUpdatedAt(item.getRestaurant().getUpdatedAt());
        }
        this.reviews = item.getReviews();
    }
}