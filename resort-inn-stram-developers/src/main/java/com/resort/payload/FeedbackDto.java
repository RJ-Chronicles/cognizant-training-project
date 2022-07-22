package com.resort.payload;


import javax.validation.constraints.NotBlank;

import javax.validation.constraints.Size;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FeedbackDto {
	private int id;

	//@Size(min=3, message="ratting should greater than 1")
	//@NotBlank(message = "rating is mandatory")
	private int rating;
	@NotBlank(message = "message  is mandatory")
	@Size(min=10, message="Message Body should contain atleast 10 character")
	private String body;
	@NotBlank(message = "name is mandatory")
	@Size(min=3, message="Name should have atleast 3 character")
	private String guest_name;
	
	private String  status = "Pending";

}
