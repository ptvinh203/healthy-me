package com.dut.healthme.service.impl;

import com.dut.healthme.common.constant.ErrorMessageConstants;
import com.dut.healthme.common.exception.BadRequestException;
import com.dut.healthme.common.exception.ForbiddenException;
import com.dut.healthme.config.auth.JwtUtils;
import com.dut.healthme.dto.request.CustomerRegisterRequest;
import com.dut.healthme.dto.request.LoginRequest;
import com.dut.healthme.dto.request.RestaurantRegisterRequest;
import com.dut.healthme.dto.response.CredentialResponse;
import com.dut.healthme.entity.Account;
import com.dut.healthme.entity.Customer;
import com.dut.healthme.entity.Restaurant;
import com.dut.healthme.entity.enums.AccountRole;
import com.dut.healthme.entity.enums.HealthGoal;
import com.dut.healthme.entity.enums.RestaurantStatus;
import com.dut.healthme.repository.AccountsRepository;
import com.dut.healthme.repository.CustomersRepository;
import com.dut.healthme.repository.RestaurantsRepository;
import com.dut.healthme.service.AuthService;
import com.dut.healthme.service.CloudinaryService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;
    private final PasswordEncoder passwordEncoder;
    private final AccountsRepository accountsRepository;
    private final CustomersRepository customersRepository;
    private final CloudinaryService cloudinaryService;
    private final RestaurantsRepository restaurantsRepository;

    @Override
    public CredentialResponse login(LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authentication);
            Account account = (Account) authentication.getPrincipal();
            // Check if the account is a restaurant account
            if (account.getRole() == AccountRole.RESTAURANT) {
                var status = restaurantsRepository.getApprovedStatusByAccountId(account.getId())
                    .orElseThrow(() -> new BadRequestException(ErrorMessageConstants.ACCOUNT_NOT_FOUND));
                switch (status) {
                    case AWAITING_APPROVAL ->
                        throw new BadRequestException(ErrorMessageConstants.ACCOUNT_WAITING_FOR_APPROVAL);
                    case APPROVAL_FAILED ->
                        throw new BadRequestException(ErrorMessageConstants.ACCOUNT_APPROVAL_FAILED);
                }
            }
            return jwtUtils.generateToken(account.getId());
        } catch (BadCredentialsException ex) {
            throw new BadRequestException(ErrorMessageConstants.INCORRECT_EMAIL_OR_PASSWORD);
        } catch (InternalAuthenticationServiceException ex) {
            throw new BadRequestException(ErrorMessageConstants.ACCOUNT_NOT_FOUND);
        } catch (DisabledException ex) {
            throw new ForbiddenException(ErrorMessageConstants.ACCOUNT_IS_DISABLED);
        }
    }

    @Override
    public Customer register(CustomerRegisterRequest registerRequest) {
        if (accountsRepository.findByEmail(registerRequest.getEmail()).isPresent()) {
            throw new BadRequestException(ErrorMessageConstants.EMAIL_ALREADY_EXISTS);
        }

        String encodedPassword = passwordEncoder.encode(registerRequest.getPassword());
        Account account = Account.builder()
            .email(registerRequest.getEmail())
            .role(AccountRole.CUSTOMER)
            .password(encodedPassword)
            .name("")
            .build();
        Customer customer = Customer.builder()
            .account(account)
            .dateOfBirth(registerRequest.getDateOfBirth())
            .gender(registerRequest.getGender())
            .height(registerRequest.getHeight())
            .weight(registerRequest.getWeight())
            .hipsMeasurement(0D)
            .waistMeasurement(0D)
            .bloodGlucose(0D)
            .bloodPressure(0D)
            .heartRate(0D)
            .chestMeasurement(0D)
            .healthGoal(HealthGoal.MAINTAIN)
            .activityIndex((short) 0)
            .build();
        try {
            this.accountsRepository.save(account);
            return this.customersRepository.save(customer);
        } catch (Exception e) {
            throw new BadRequestException(ErrorMessageConstants.ACCOUNT_SAVE_FAILED);
        }
    }

    @Override
    public Restaurant uploadCertificate(List<MultipartFile> files, Long restaurantId) {
        List<String> listCertificate = this.cloudinaryService.uploadFiles(files);
        if (listCertificate.isEmpty()) {
            throw new BadRequestException(ErrorMessageConstants.UPLOAD_FILE_FAILED);
        }
        Restaurant restaurant = this.restaurantsRepository.findById(restaurantId).orElse(null);
        if (restaurant == null) {
            throw new BadRequestException(ErrorMessageConstants.RESTAURANT_NOT_FOUND);
        }
        restaurant.setCertification(listCertificate);
        try {
            return this.restaurantsRepository.save(restaurant);
        } catch (Exception e) {
            throw new BadRequestException(ErrorMessageConstants.SAVE_FILE_FAILED);
        }
    }

    @Override
    public Restaurant register(RestaurantRegisterRequest registerRequest) {
        if (accountsRepository.findByEmail(registerRequest.getEmail()).isPresent()) {
            throw new BadRequestException(ErrorMessageConstants.EMAIL_ALREADY_EXISTS);
        }

        String encodedPassword = passwordEncoder.encode(registerRequest.getPassword());
        Account account = Account.builder()
            .email(registerRequest.getEmail())
            .role(AccountRole.RESTAURANT)
            .password(encodedPassword)
            .name(registerRequest.getName())
            .build();

        Restaurant restaurant = Restaurant.builder()
            .account(account)
            .address(registerRequest.getAddress())
            .certification(Collections.singletonList("temp"))
            .status(RestaurantStatus.AWAITING_APPROVAL)
            .build();
        try {
            this.accountsRepository.save(account);
            return this.restaurantsRepository.save(restaurant);
        } catch (Exception e) {
            throw new BadRequestException(ErrorMessageConstants.ACCOUNT_SAVE_FAILED);
        }
    }
}
