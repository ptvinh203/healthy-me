package com.dut.healthme.config.auth;

import com.dut.healthme.common.constant.CommonConstants;
import com.dut.healthme.common.constant.ErrorMessageConstants;
import com.dut.healthme.common.exception.ForbiddenException;
import com.dut.healthme.common.exception.UnauthorizedException;
import com.dut.healthme.common.model.AbstractResponse;
import com.dut.healthme.common.model.ErrorResponse;
import com.dut.healthme.common.util.CommonUtils;
import com.dut.healthme.common.util.ErrorUtils;
import com.dut.healthme.entity.Account;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Objects;

@Component
@RequiredArgsConstructor
public class JwtAuthFilterConfig extends OncePerRequestFilter {
    private final JwtUtils jwtUtils;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            // Handle pre-flight requests (OPTIONS)
            if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
                filterChain.doFilter(request, response);
                return;
            }

            // Jwt token
            final String authorizationHeader = request.getHeader("Authorization");
            if (authorizationHeader == null || !authorizationHeader.startsWith(CommonConstants.JWT_TYPE)) {
                filterChain.doFilter(request, response);
                return;
            }

            // Get the token from the header
            String token = authorizationHeader.replaceFirst("%s ".formatted(CommonConstants.JWT_TYPE), "");

            // Set new authentication object to the SecurityContextHolder
            Account userDetails = jwtUtils.getAccountFromToken(token);
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userDetails, token, userDetails.getAuthorities());
            authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            SecurityContextHolder.getContext().setAuthentication(authenticationToken);

            filterChain.doFilter(request, response);
        } catch (ForbiddenException | UnauthorizedException ex) {
            response.setStatus(ex instanceof UnauthorizedException ? HttpServletResponse.SC_UNAUTHORIZED : HttpServletResponse.SC_FORBIDDEN);
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            ErrorResponse error = ErrorUtils.getExceptionError(ex.getMessage());
            AbstractResponse abstractResponse = AbstractResponse.error(error);
            response
                .getWriter()
                .write(Objects.requireNonNull(CommonUtils.Json.encode(abstractResponse)));
        } catch (Exception ex) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            ErrorResponse error = new ErrorResponse(ErrorMessageConstants.INTERNAL_SERVER_ERROR, ex.getMessage());
            AbstractResponse abstractResponse = AbstractResponse.error(error);
            response
                .getWriter()
                .write(Objects.requireNonNull(CommonUtils.Json.encode(abstractResponse)));
        }
    }
}
