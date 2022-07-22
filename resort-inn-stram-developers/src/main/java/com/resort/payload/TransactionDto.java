package com.resort.payload;



import javax.validation.constraints.Size;



import lombok.Data;

@Data
public class TransactionDto {
	private double payment;
	
//	@NotBlank(message = "name is mandatory")
	private String fullName;
//	@NotBlank(message = "card number is required")
	@Size(min=12 , max=12, message="card number should have 12 digits")
	private String cardNumber;
	
//	@Pattern(regexp = "(^$|[0-9]{2})", message ="invalid date")
	private String expiry;
//	
//	@Pattern(regexp = "(^$|[0-9]{3})", message ="invalid ccv")
	private String ccv;
	
	
}
