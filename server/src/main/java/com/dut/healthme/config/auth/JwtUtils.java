package com.dut.healthme.config.auth;

import com.dut.healthme.common.constant.ErrorMessageConstants;
import com.dut.healthme.common.exception.ForbiddenException;
import com.dut.healthme.common.exception.UnauthorizedException;
import com.dut.healthme.dto.response.CredentialResponse;
import com.dut.healthme.entity.Account;
import com.dut.healthme.repository.AccountsRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
@RequiredArgsConstructor
public class JwtUtils {
    @Value("${application.jwt.access-token-secret}")
    private String accessTokenSecret;
    @Value("${application.jwt.access-token-expiration-ms}")
    private Long accessTokenExpirationMs;

    private final AccountsRepository accountRepository;

    public Account getAccountFromToken(String token) {
        try {
            Claims jwtClaims = getJwtClaims(token);
            Long accountId = Long.parseLong(jwtClaims.getSubject());
            return accountRepository.findById(accountId)
                .orElseThrow(() -> new ForbiddenException(ErrorMessageConstants.FORBIDDEN));
        } catch (Exception e) {
            throw new ForbiddenException(ErrorMessageConstants.FORBIDDEN);
        }
    }

    public CredentialResponse generateToken(Long accountId) {
        String accessToken = generateAccessToken(accountId);
        return CredentialResponse.builder()
            .accessToken(accessToken)
            .build();

    }

    private String generateAccessToken(Long accountId) {
        return Jwts.builder()
            .subject(String.valueOf(accountId))
            .issuedAt(new Date())
            .expiration(new Date(System.currentTimeMillis() + accessTokenExpirationMs))
            .signWith(getSignInKey(accessTokenSecret))
            .compact();
    }

    private Claims getJwtClaims(String token) {
        try {
            return Jwts.parser()
                .verifyWith(getSignInKey(accessTokenSecret))
                .build()
                .parseSignedClaims(token)
                .getPayload();
        } catch (ExpiredJwtException ex) {
            throw new UnauthorizedException(ErrorMessageConstants.EXPIRED_TOKEN);
        } catch (Exception ex) {
            throw new UnauthorizedException(ErrorMessageConstants.INVALID_TOKEN);
        }
    }

    private SecretKey getSignInKey(String secretKey) {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}