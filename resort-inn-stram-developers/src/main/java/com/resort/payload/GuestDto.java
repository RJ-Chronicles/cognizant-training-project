package com.resort.payload;

import java.time.LocalDate;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GuestDto {

	private int guestId;
	@NotBlank(message = "name is mandatory")
	@Size(min=6, message="Name should have atleast 6 character")
	private String fullName;
	
/*	@NotBlank(message = "last name  is mandatory")
	@Size(min=3, message="Name should have atleast 3 character")
	private String lastName;
*/	
	@Email(message = "Email is not valid", regexp = "(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])")
	@NotBlank(message = "mail is mandatory")
	private String email;
/*	
	@NotBlank(message = "address is mandatory")
	@Size(min=7, message="Address should have atleast 7 character")
	private String address;
*/	
	@NotBlank(message = "password is mandatory")
	@Size(min=7, message="Password should have atleast 7 character")
	private String password;
	
	@NotBlank(message = "contact is mandatory")
	@Pattern(regexp = "(^$|[0-9]{10})", message ="invalid contact")
	private String contact;
	
	private LocalDate registeredDate;
}
