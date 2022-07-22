package com.cts.config;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.cts.filters.TokenValidationFilter;

import lombok.RequiredArgsConstructor;



@RequiredArgsConstructor
@Configuration
public class RouteConfigurations {

	private final TokenValidationFilter tokenValidationFilter;

	// uri -> authorization-service/authenticate
	@Bean
	public RouteLocator routes(RouteLocatorBuilder builder) {
		return builder.routes()

				.route("authorization-service", ps -> ps.path("/authorization-service/**")
						.filters(f -> f.stripPrefix(1))
						.uri("lb://authorization-service"))

				.route("employee-service", ps -> ps.path("/employee-service/**")
						.filters(f -> f.filter(tokenValidationFilter)
								.removeRequestHeader("Cookie")
								.removeRequestHeader("Set-Cookie")
								.stripPrefix(1))
						.uri("lb://employee-service"))

				.route("employee-ui", ps -> ps.path("/employee-ui/**")
						.filters(f -> f.stripPrefix(1))
						.uri("lb://employee-ui"))

				.build();
	}

}
