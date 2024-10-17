package com.dut.healthme.service;

import com.dut.healthme.dto.request.LoginRequest;
import com.dut.healthme.dto.response.CredentialResponse;

public interface AuthService {
    CredentialResponse login(LoginRequest loginRequest);
}
