package com.resort.payload;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;


import lombok.Data;

@Data
public class LoginDto {
	@NotBlank(message = "email is mandatory")
	@Email(message="Email is not valid")
	private String email;
	@NotBlank(message = "password is mandatory")
	private String password;
}
