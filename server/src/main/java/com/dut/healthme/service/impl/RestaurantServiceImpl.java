package com.dut.healthme.service.impl;

import com.dut.healthme.common.constant.ErrorMessageConstants;
import com.dut.healthme.common.exception.BadRequestException;
import com.dut.healthme.entity.Restaurant;
import com.dut.healthme.entity.enums.RestaurantStatus;
import com.dut.healthme.repository.RestaurantsRepository;
import com.dut.healthme.service.RestaurantService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@RequiredArgsConstructor
public class RestaurantServiceImpl implements RestaurantService {
    private final RestaurantsRepository restaurantsRepository;
    @Override
    public List<Restaurant> getRestaurantsWaiting() {
        return this.restaurantsRepository.findByStatusIn(
            List.of(RestaurantStatus.AWAITING_APPROVAL, RestaurantStatus.APPROVAL_FAILED)
        );
    }

    @Override
    public Restaurant approveRestaurant(Long restaurantId) {
        Restaurant restaurant = restaurantsRepository.findById(restaurantId).orElse(null);
        if (restaurant == null) {
            throw new BadRequestException(ErrorMessageConstants.RESTAURANT_NOT_FOUND);
        }
        restaurant.setStatus(RestaurantStatus.APPROVED);
        return restaurantsRepository.save(restaurant);
    }

    @Override
    public Restaurant rejectRestaurant(Long restaurantId) {
        Restaurant restaurant = restaurantsRepository.findById(restaurantId).orElse(null);
        if (restaurant == null) {
            throw new BadRequestException(ErrorMessageConstants.RESTAURANT_NOT_FOUND);
        }
        restaurant.setStatus(RestaurantStatus.APPROVAL_FAILED);
        return restaurantsRepository.save(restaurant);
    }
}
