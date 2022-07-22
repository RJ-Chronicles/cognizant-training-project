package com.resort.serviceImpl;

import com.resort.service.TransactionService;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.resort.entity.Booking;
import com.resort.entity.Transaction;
import com.resort.exception.ResourceNotFound;
import com.resort.payload.ResponseEntityDto;
import com.resort.payload.TransactionDto;
import com.resort.repository.BookingRepository;


import com.resort.repository.TransactionRepository;

@Service
public class TransactionServiceImpl implements TransactionService {


	private TransactionRepository transactionRepository;
	private BookingRepository bookingRepository;
	
	public TransactionServiceImpl(TransactionRepository transactionRepository,
			BookingRepository bookingRepository,ModelMapper mapper) {

		this.transactionRepository = transactionRepository;
		this.bookingRepository = bookingRepository;
	}
	@Override
	public ResponseEntityDto saveBookingTransaction(String bookingId, TransactionDto transactionDto) {
		Booking booking = bookingRepository.findById(bookingId).orElseThrow(()-> new ResourceNotFound("Booking","id",0));
		Transaction transaction = new Transaction();
		//mapToTransaction(transactionDto);
		transaction.setPayment(transactionDto.getPayment());
		transaction.setBooking(booking);
		transactionRepository.save(transaction);
	
		return new ResponseEntityDto("Payment Success");


	}

	@Override
	public List<TransactionDto> retriveAllTransactionRecords() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<TransactionDto> retriveRecordBasedOnBookingId(int bookingId) {
		// TODO Auto-generated method stub
		return null;
	}


}

