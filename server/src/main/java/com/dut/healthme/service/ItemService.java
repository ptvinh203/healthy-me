package com.dut.healthme.service;

import com.dut.healthme.dto.response.ItemResponse;
import com.dut.healthme.entity.Item;

import java.util.List;

public interface ItemService {
    List<ItemResponse> getItemsByEvaluate();
    List<ItemResponse> getItemsByCaloRec(double calo);
    ItemResponse getItemById(Long id);
}
