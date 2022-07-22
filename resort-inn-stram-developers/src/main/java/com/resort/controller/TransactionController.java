package com.resort.controller;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.resort.payload.DashboardDto;
import com.resort.payload.ResponseEntityDto;
import com.resort.payload.TransactionDto;
import com.resort.service.GuestService;
import com.resort.service.TransactionService;

@RestController
@RequestMapping("/api/v1/transaction")
@CrossOrigin(origins= "http://localhost:3000")
public class TransactionController {
	private GuestService guestService;
	private TransactionService transactionService;
	
	
	public TransactionController(TransactionService transactionService,GuestService guestService) {
		this.transactionService = transactionService;
		this.guestService =guestService;
	}
	@PostMapping("/{bookingId}/transaction")
	public ResponseEntity<ResponseEntityDto> createGuestBooking(@PathVariable (value="bookingId") String bookingId,
	@RequestBody @Valid TransactionDto transactionDto) {
	System.out.println(transactionDto.getPayment());
		return new ResponseEntity<ResponseEntityDto>(transactionService.saveBookingTransaction(bookingId, transactionDto), HttpStatus.CREATED);

	}
	@GetMapping("/dashboard")
	public ResponseEntity<DashboardDto> dashboardDetails(){
		return new ResponseEntity<DashboardDto>(guestService.getInfoForDashboard(), HttpStatus.OK);

	}
}
