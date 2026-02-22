package com.company.asset_app.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;

import feign.RequestInterceptor;

@Configuration
public class FeignConfig {
    @Bean
    public RequestInterceptor requestInterceptor() {
        return requestTemplate ->{
            Authentication authentifcation=
                SecurityContextHolder.getContext().getAuthentication();
                if (authentifcation instanceof JwtAuthenticationToken jwtAuth){
                    String tokenValue = jwtAuth.getToken().getTokenValue();
                    requestTemplate.header("Authorization","Bearer "+tokenValue);
                }
        };
    }
}
