package com.dut.healthme.service;

import com.dut.healthme.dto.request.CustomerRegisterRequest;
import com.dut.healthme.dto.request.LoginRequest;
import com.dut.healthme.dto.request.RestaurantRegisterRequest;
import com.dut.healthme.dto.response.CredentialResponse;
import com.dut.healthme.entity.Account;
import com.dut.healthme.entity.Customer;
import com.dut.healthme.entity.Restaurant;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface AuthService {
    CredentialResponse login(LoginRequest loginRequest);
    Customer register(CustomerRegisterRequest registerRequest);
    Restaurant uploadCertificate(List<MultipartFile> files, Long restaurantId);
    Restaurant register(RestaurantRegisterRequest registerRequest);
}
