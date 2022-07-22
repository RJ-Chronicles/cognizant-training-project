package com.resort.payload;

import java.util.*;
import lombok.Data;

@Data
public class FieldErrorResponse {
	private List<CustomFieldErrorsDto> fieldErrors;
}
