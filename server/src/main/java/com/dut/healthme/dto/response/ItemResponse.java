package com.dut.healthme.dto.response;

import com.dut.healthme.annotation.json.JsonSnakeCaseNaming;
import com.dut.healthme.entity.Item;
import com.dut.healthme.entity.Review;
import com.dut.healthme.entity.enums.ItemType;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.util.List;
import java.util.OptionalDouble;

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
    private RestaurantResponse restaurant;
    private List<Review> reviews;
    private Double rating;

    public ItemResponse(Item item) {
        this.id = item.getId();
        this.name = item.getName();
        this.description = item.getDescription();
        this.price = item.getPrice();
        this.image = item.getImage();
        this.calo = item.getCalo();
        this.type = item.getType();
        this.ingredients = item.getIngredients();
        // Initialize and set restaurant details
        if (item.getRestaurant() != null) {
            this.restaurant = new RestaurantResponse().fromEntity(item.getRestaurant());
        }
        this.reviews = item.getReviews();

        // Tính trung bình đánh giá (evaluate) từ danh sách reviews
        if (this.reviews != null && !this.reviews.isEmpty()) {
            OptionalDouble average = this.reviews.stream()
                .mapToDouble(Review::getEvaluate)
                .average();
            this.rating = average.isPresent() ? average.getAsDouble() : 0.0;
        } else {
            this.rating = 0.0; // hoặc có thể gán mặc định là 0
        }
    }
}