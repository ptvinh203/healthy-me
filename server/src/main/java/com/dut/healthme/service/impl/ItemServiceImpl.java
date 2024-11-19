package com.dut.healthme.service.impl;

import com.dut.healthme.common.constant.ErrorMessageConstants;
import com.dut.healthme.common.exception.BadRequestException;
import com.dut.healthme.dto.request.AddItemRequest;
import com.dut.healthme.dto.response.ItemResponse;
import com.dut.healthme.entity.Account;
import com.dut.healthme.entity.Item;
import com.dut.healthme.entity.Restaurant;
import com.dut.healthme.repository.CustomersRepository;
import com.dut.healthme.repository.ItemsRepository;
import com.dut.healthme.repository.RestaurantsRepository;
import com.dut.healthme.service.CloudinaryService;
import com.dut.healthme.service.CustomerService;
import com.dut.healthme.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ItemServiceImpl implements ItemService {
    private final ItemsRepository itemsRepository;
    private final CustomerService customerService;
    private final CustomersRepository customersRepository;
    private final RestaurantsRepository restaurantsRepository;
    private final CloudinaryService cloudinaryService;
    @Override
    public List<ItemResponse> getItemsByEvaluate() {
        return this.itemsRepository.findAllItemsOrderByAverageReview();
    }

    @Override
    public List<ItemResponse> getItemsByCaloRec(Account account) {
        double calo = this.customerService.getCustomerInfo(account.getId()).getSuggestedCalorieIntake();
        return this.itemsRepository.findItemsByCaloApproximation(calo);
    }

    @Override
    public ItemResponse getItemById(Long id) {
        return this.itemsRepository.findItemById(id);
    }

    @Override
    public List<ItemResponse> getItemsByNameOrIngredients(String key) {
        List<Item> items = this.itemsRepository.findByNameOrIngredient(key);
        return items.stream()
            .map(item -> new ItemResponse(item))
            .collect(Collectors.toList());
    }
    @Override
    public Item addItem(AddItemRequest addItemRequest, Account restaurantAccount) {
        Restaurant restaurantFound = this.restaurantsRepository.findByaccountId(restaurantAccount.getId()).orElse(null);
        System.out.println("service"+restaurantFound);
        if (restaurantFound == null) {
            throw  new BadRequestException(ErrorMessageConstants.RESTAURANT_NOT_FOUND);
        }
        Item itemByName = this.itemsRepository.findByNameAndRestaurantId(addItemRequest.getName(),restaurantFound.getId());
        if (itemByName != null) {
            throw new BadRequestException(ErrorMessageConstants.ITEM_NAME_EXISTED);
        }
        Item newItem = Item.builder()
            .name(addItemRequest.getName())
            .ingredients(addItemRequest.getIngredients())
            .description(addItemRequest.getDescription())
            .price(addItemRequest.getPrice())
            .image("")
            .calo(addItemRequest.getCalo())
            .restaurant(restaurantFound)
            .type(addItemRequest.getType())
            .build();
        try {
            return this.itemsRepository.save(newItem);
        }
        catch (Exception e) {
            throw new BadRequestException(ErrorMessageConstants.iTEM_SAVE_FAILED);
        }
    }

    @Override
    public Item uploadImage(MultipartFile file, Long itemId, Account restaurantAccount) {
        Item item = this.itemsRepository.findById(itemId).orElse(null);
        if (item == null) {
            throw new BadRequestException(ErrorMessageConstants.ITEM_NOT_FOUND);
        }
        if (item.getRestaurant().getAccount().getId() != restaurantAccount.getId()) {
            throw  new BadRequestException(ErrorMessageConstants.ACTION_IS_NOT_ALLOWED);
        }
        String imageLink = this.cloudinaryService.uploadFile(file);
        if (imageLink.isEmpty()) {
            throw new BadRequestException(ErrorMessageConstants.UPLOAD_FILE_FAILED);
        }
        item.setImage(imageLink);
        try {
            return this.itemsRepository.save(item);
        } catch (Exception e) {
            throw new BadRequestException(ErrorMessageConstants.SAVE_FILE_FAILED);
        }
    }
}
