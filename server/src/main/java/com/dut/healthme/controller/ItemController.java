package com.dut.healthme.controller;

import com.dut.healthme.common.model.AbstractResponse;
import com.dut.healthme.dto.response.ListRecommendResponse;
import com.dut.healthme.service.ItemService;
import io.lettuce.core.dynamic.annotation.Param;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/item")
@RequiredArgsConstructor
public class ItemController {
    private final ItemService itemService;

    @GetMapping("/recommend")
    public ResponseEntity<AbstractResponse> GetRecommend2List(@Param("calo") double calo) {
        var listRecommend1 = this.itemService.getItemsByEvaluate();
        var listRecommend2 = this.itemService.getItemsByCaloRec(calo);
        return ResponseEntity.ok(AbstractResponse.successWithoutMeta(new ListRecommendResponse(listRecommend1, listRecommend2)));
    }

}
