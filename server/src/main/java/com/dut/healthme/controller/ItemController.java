package com.dut.healthme.controller;

import com.dut.healthme.annotation.auth.CurrentAccount;
import com.dut.healthme.annotation.auth.PreAuthorizeCustomer;
import com.dut.healthme.common.model.AbstractResponse;
import com.dut.healthme.dto.response.ItemResponse;
import com.dut.healthme.dto.response.ListRecommendResponse;
import com.dut.healthme.entity.Account;
import com.dut.healthme.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

}
