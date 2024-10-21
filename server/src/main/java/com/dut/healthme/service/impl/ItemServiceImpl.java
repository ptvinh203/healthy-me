package com.dut.healthme.service.impl;

import com.dut.healthme.dto.response.ItemResponse;
import com.dut.healthme.entity.Account;
import com.dut.healthme.entity.Item;
import com.dut.healthme.repository.CustomersRepository;
import com.dut.healthme.repository.ItemsRepository;
import com.dut.healthme.service.CustomerService;
import com.dut.healthme.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@RequiredArgsConstructor
public class ItemServiceImpl implements ItemService {
    private final ItemsRepository itemsRepository;
    private final CustomerService customerService;
    private final CustomersRepository customersRepository;
    @Override
    public List<ItemResponse> getItemsByEvaluate() {
        return this.itemsRepository.findAllItemsOrderByAverageReview();
    }

    @Override
    public List<ItemResponse> getItemsByCaloRec(Account account) {
        Long idCustomer = this.customersRepository.findByAccountId(account.getId()).getId();
        double calo = this.customerService.getCustomerInfo(idCustomer).getSuggestedCalorieIntake();
        return this.itemsRepository.findItemsByCaloApproximation(calo);
    }

    @Override
    public ItemResponse getItemById(Long id){
        return this.itemsRepository.findItemById(id);
    }
}
