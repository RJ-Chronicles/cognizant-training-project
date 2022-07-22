package com.resort.service;

import java.util.List;

import com.resort.payload.BookingDto;
import com.resort.payload.BookingResponseDto;
import com.resort.payload.ResponseEntityDto;

public interface BookingService {
	public BookingResponseDto registerNewGuestBooking(BookingDto bookingDto,int guest_id);
	public BookingDto updateExisingBooking(BookingDto bookingDto,int guest_id, int transaction_id);
	public void deleteGuestBooking(String booking_id, int guest_id, int transaction_id);
	
	public ResponseEntityDto rescheduleUserBooking(String id, BookingDto bookingDto);
	
	
	public List<BookingDto> getAllBookingList();
	
	public void deleteBookingById(String id);
	
	public void updateBookingById(String id);
	
	public List<BookingDto> getAllBookingListWithGuestId(int id);
}
