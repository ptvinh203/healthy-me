package com.dut.healthme.controller;

import com.dut.healthme.annotation.auth.PreAuthorizeAdmin;
import com.dut.healthme.common.model.AbstractResponse;
import com.dut.healthme.entity.Restaurant;
import com.dut.healthme.service.RestaurantService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/v1/restaurant")
@RequiredArgsConstructor
public class RestaurantController {
    private final RestaurantService restaurantService;
    @GetMapping("/waitings")
    @PreAuthorizeAdmin
    public ResponseEntity<AbstractResponse> waitings() {
        var result = this.restaurantService.getRestaurantsWaiting();
        return ResponseEntity.ok(AbstractResponse.successWithoutMeta(result));
    }
    @PutMapping("/approve")
    @PreAuthorizeAdmin
    public ResponseEntity<AbstractResponse> approve(@RequestParam("id")Long restaurantId) {
        var result = this.restaurantService.approveRestaurant(restaurantId);
        return ResponseEntity.ok(AbstractResponse.successWithoutMeta(result));
    }
    @PutMapping("/reject")
    @PreAuthorizeAdmin
    public ResponseEntity<AbstractResponse> reject(@RequestParam("id")Long restaurantId) {
        var result = this.restaurantService.rejectRestaurant(restaurantId);
        return ResponseEntity.ok(AbstractResponse.successWithoutMeta(result));
    }
}
