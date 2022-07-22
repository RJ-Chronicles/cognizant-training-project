package com.resort.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.resort.payload.ResponseEntityDto;
import com.resort.payload.TransactionDto;

@Service
public interface TransactionService {
	public ResponseEntityDto saveBookingTransaction(String bookingId, TransactionDto transactionDto);
	
	public List<TransactionDto> retriveAllTransactionRecords();
	
	public List<TransactionDto> retriveRecordBasedOnBookingId(int bookingId);
}
