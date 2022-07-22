package com.cts.filters;

import javax.naming.AuthenticationException;

import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.server.ServerWebExchange;

import com.cts.util.FilterUtils;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;

@Slf4j
@RequiredArgsConstructor
@Component
public class TokenValidationFilter implements GatewayFilter {

	private final FilterUtils filterUtils;
	private final WebClient.Builder builder;

	@Override
	public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
		log.info("Validating the token");
		ServerHttpRequest request = exchange.getRequest();

		log.info("Extracting the token");
		String token = filterUtils.getAuthorizationHeader(request);

		log.info("Sending request to authorization-service to validate the token");
		return builder.baseUrl("http://authorization-service")
				.build()
				.get()
				.uri("/validate/" + token)
				.retrieve()
				.onStatus(HttpStatus::is4xxClientError, cr -> Mono.error(new AuthenticationException("Bad token")))
				.bodyToMono(String.class)
				.then(chain.filter(exchange));

	}

}
