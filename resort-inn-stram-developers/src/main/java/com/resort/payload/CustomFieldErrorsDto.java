package com.resort.payload;

import lombok.Data;

@Data
public class CustomFieldErrorsDto {
	private String field;
	private String message;
}
