package com.dut.healthme.controller;

import com.dut.healthme.annotation.auth.CurrentAccount;
import com.dut.healthme.annotation.auth.PreAuthorizeAll;
import com.dut.healthme.common.model.AbstractResponse;
import com.dut.healthme.dto.request.LoginRequest;
import com.dut.healthme.dto.response.AccountInfo;
import com.dut.healthme.entity.Account;
import com.dut.healthme.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/me")
    @PreAuthorizeAll
    public ResponseEntity<AbstractResponse> getAccountInfo(@CurrentAccount Account account) {
        return ResponseEntity.ok(AbstractResponse.successWithoutMeta(new AccountInfo().fromEntity(account)));
    }
}
