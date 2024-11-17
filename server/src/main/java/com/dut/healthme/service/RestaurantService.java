package com.dut.healthme.service;

import com.dut.healthme.entity.Restaurant;

import java.util.List;

public interface RestaurantService {
    List<Restaurant> getRestaurantsWaiting();
    Restaurant approveRestaurant(Long restaurantId);
    Restaurant rejectRestaurant(Long restaurantId);
}
