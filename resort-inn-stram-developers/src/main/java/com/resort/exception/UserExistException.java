package com.resort.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus( value=HttpStatus.ALREADY_REPORTED)
public class UserExistException extends RuntimeException{
	private static final long serialVersionUID = 1L;
	private String resourceName;
	private HttpStatus status;
	public HttpStatus getStatus() {
		return status;
	}
	public void setStatus(HttpStatus status) {
		this.status = status;
	}
	public String getResourceName() {
		return resourceName;
	}
	public void setResourceName(String resourceName) {
		this.resourceName = resourceName;
	}
	public UserExistException(HttpStatus status,String resourceName) {
		super();
		this.status = status;
		this.resourceName = resourceName;
	}
	
	

}
