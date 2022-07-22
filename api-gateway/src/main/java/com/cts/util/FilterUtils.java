package com.cts.util;

import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;

@Component
public class FilterUtils {

	public String getAuthorizationHeader(ServerHttpRequest request) {
		return request.getHeaders()
				.getOrEmpty("Authorization")
				.get(0)
				.substring(7);
	}

}
