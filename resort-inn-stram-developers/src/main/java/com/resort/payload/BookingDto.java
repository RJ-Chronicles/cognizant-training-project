package com.resort.payload;

import java.time.LocalDate;

import javax.validation.constraints.FutureOrPresent;
import javax.validation.constraints.NotBlank;

import lombok.Data;
import com.fasterxml.jackson.annotation.JsonFormat;

@Data
public class BookingDto {
	
	private String id;
	@FutureOrPresent(message="Check Inn date must be Future date")
	@JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate checkIn;
	//@NotBlank(message = "check out date is mandatory")
	@FutureOrPresent(message="Check Out date must be Future date")
	@JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate checkOut;
	@NotBlank(message = "address is mandatory")
	private String address;
//	@NotBlank(message = "room is mandatory")
	private int roomId;
	private String status= "Pending";
}
