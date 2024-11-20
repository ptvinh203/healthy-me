package com.dut.healthme.controller;

import com.dut.healthme.annotation.auth.CurrentAccount;
import com.dut.healthme.annotation.auth.PreAuthorizeAdmin;
import com.dut.healthme.annotation.auth.PreAuthorizeCustomer;
import com.dut.healthme.annotation.auth.PreAuthorizeRestaurant;
import com.dut.healthme.common.model.AbstractResponse;
import com.dut.healthme.dto.request.AddItemRequest;
import com.dut.healthme.dto.response.ItemResponse;
import com.dut.healthme.dto.response.ListRecommendResponse;
import com.dut.healthme.entity.Account;
import com.dut.healthme.service.ItemService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/v1/item")
@RequiredArgsConstructor
public class ItemController {
    private final ItemService itemService;

    @GetMapping("/recommend")
    @PreAuthorizeCustomer
    public ResponseEntity<AbstractResponse> GetRecommend2List(@CurrentAccount Account account) {
        var listRecommend1 = this.itemService.getItemsByEvaluate();
        var listRecommend2 = this.itemService.getItemsByCaloRec(account);
        return ResponseEntity.ok(AbstractResponse.successWithoutMeta(new ListRecommendResponse(listRecommend1, listRecommend2)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<AbstractResponse> GetItemById(@PathVariable Long id) {
        ItemResponse itemResponse = this.itemService.getItemById(id);
        if (itemResponse != null) {
            return ResponseEntity.ok(AbstractResponse.successWithoutMeta(itemResponse));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/landing")
    public ResponseEntity<AbstractResponse> GetItemLanding() {
        var listRecommend1 = this.itemService.getItemsByEvaluate();
        return ResponseEntity.ok(AbstractResponse.successWithoutMeta( listRecommend1));
    }

    @GetMapping("/search")
    public ResponseEntity<AbstractResponse> GetFindItem(@Param("keyword") String keyword) {
        System.out.println(keyword);
        var result = this.itemService.getItemsByNameOrIngredients(keyword);
        return ResponseEntity.ok(AbstractResponse.successWithoutMeta(result));
    }
    @PostMapping("/add")
    @PreAuthorizeRestaurant
    public ResponseEntity<AbstractResponse> AddItem(@Valid @RequestBody AddItemRequest request, @CurrentAccount Account account) {
        System.out.println("oke"+account.getId());
        var result = this.itemService.addItem(request,account);
        return ResponseEntity.ok(AbstractResponse.successWithoutMeta(result));
    }
    @PostMapping("/uploadImage")
    @PreAuthorizeRestaurant
    public ResponseEntity<AbstractResponse> uploadImage(
        @RequestParam("file") MultipartFile files,
        @RequestParam("itemId") Long id,
        @CurrentAccount Account restaurantAccount) {
        var item = this.itemService.uploadImage(files,id,restaurantAccount);
        return ResponseEntity.ok(AbstractResponse.successWithoutMeta(item));
    }

    @GetMapping("/GetListFoodBy")
    @PreAuthorizeRestaurant
    public ResponseEntity<AbstractResponse> getFoodsByType(
        @RequestParam("type") String type,
        @CurrentAccount Account restaurantAccount)
    {
        var items = this.itemService.getItemsByTypeAndRestaurantId(type, restaurantAccount);
        return ResponseEntity.ok(AbstractResponse.successWithoutMeta(items));
    }
}
