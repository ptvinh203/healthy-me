package com.dut.healthme.controller;

import com.dut.healthme.annotation.auth.CurrentAccount;
import com.dut.healthme.annotation.auth.PreAuthorizeAll;
import com.dut.healthme.common.model.AbstractResponse;
import com.dut.healthme.dto.request.CustomerRegisterRequest;
import com.dut.healthme.dto.request.LoginRequest;
import com.dut.healthme.dto.request.RestaurantRegisterRequest;
import com.dut.healthme.dto.response.AccountInfo;
import com.dut.healthme.entity.Account;
import com.dut.healthme.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController("AuthController")
@RequestMapping("/v1/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<AbstractResponse> login(@Valid @RequestBody LoginRequest loginRequest) {
        var credentialResponse = authService.login(loginRequest);
        return ResponseEntity.ok(AbstractResponse.successWithoutMeta(credentialResponse));
    }
    @PostMapping("/register")
    public ResponseEntity<AbstractResponse> register(@Valid @RequestBody CustomerRegisterRequest registerRequest) {
        System.out.println(registerRequest);
        var customerResponse = authService.register(registerRequest);
        return ResponseEntity.ok(AbstractResponse.successWithoutMeta(customerResponse));
    }
    @GetMapping("/me")
    @PreAuthorizeAll
    public ResponseEntity<AbstractResponse> getAccountInfo(@CurrentAccount Account account) {
        return ResponseEntity.ok(AbstractResponse.successWithoutMeta(new AccountInfo().fromEntity(account)));
    }
    @PostMapping("/uploadCertificate")
    public ResponseEntity<AbstractResponse> uploadCertificate(
        @RequestParam("files") List<MultipartFile> files,
        @RequestParam("restaurantId") Long id) {
        var restaurant = this.authService.uploadCertificate(files,id);
        return ResponseEntity.ok(AbstractResponse.successWithoutMeta(restaurant));
    }
    @PostMapping("/register-restaurant")
    public ResponseEntity<AbstractResponse> registerRestaurant(@Valid @RequestBody RestaurantRegisterRequest registerRequest) {
        System.out.println(registerRequest);
        var restaurantResponse = authService.register(registerRequest);
        return ResponseEntity.ok(AbstractResponse.successWithoutMeta(restaurantResponse));
    }
}
