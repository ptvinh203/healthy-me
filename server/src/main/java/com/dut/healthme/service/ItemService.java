package com.dut.healthme.service;

import com.dut.healthme.dto.request.AddItemRequest;
import com.dut.healthme.dto.response.ItemResponse;
import com.dut.healthme.entity.Account;
import com.dut.healthme.entity.Item;
import com.dut.healthme.entity.Restaurant;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ItemService {
    List<ItemResponse> getItemsByEvaluate();
    List<ItemResponse> getItemsByCaloRec(Account account);
    ItemResponse getItemById(Long id);
    List<ItemResponse> getItemsByNameOrIngredients(String key);
    Item addItem(AddItemRequest addItemRequest, Account restaurantAccount);
    Item uploadImage(MultipartFile file, Long itemId, Account restaurantAccount);
}
