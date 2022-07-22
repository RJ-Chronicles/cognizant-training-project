package com.resort.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DashboardDto {
	private BookingDto bkDto;
	private GuestDto gtDto;
	private TransactionDto trDto;
	
	private long bookingCount;
	private long guestCount;
	private long transactionAmountTotal;
	
}
