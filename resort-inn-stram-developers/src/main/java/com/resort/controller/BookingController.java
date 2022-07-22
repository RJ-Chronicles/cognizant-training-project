package com.resort.controller;

import java.util.List;

import javax.validation.Valid;
import com.resort.payload.BookingResponseDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.resort.payload.BookingDto;
import com.resort.payload.ResponseEntityDto;
import com.resort.service.BookingService;

import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/api/v1/booking")
@CrossOrigin(origins= "http://localhost:3000")
public class BookingController {
	
	private BookingService bookingService;
	public BookingController(BookingService bookingService) {
		this.bookingService = bookingService;
	}
	
	@ApiOperation(value = "Create bookings REST API")
//	@PreAuthorize("hasRole('USER')")
	@PostMapping("/{guestId}/booking")
	public ResponseEntity<BookingResponseDto>  createGuestBooking(@PathVariable (value="guestId") int guestId,
			@RequestBody @Valid BookingDto bookingDto) {
		return new ResponseEntity<BookingResponseDto>(bookingService.registerNewGuestBooking(bookingDto, guestId), HttpStatus.CREATED);
		
	}
	
//	@ApiOperation(value = "Fetch all bookings REST API")
//	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping("/getBookingList")
	public List<BookingDto> getAllBookingList(){
		return bookingService.getAllBookingList();
	}
	
	@ApiOperation(value = "Delete bookings REST API")
//	@PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteBookingById(@PathVariable (value= "id") String id){
    	bookingService.deleteBookingById(id);
    	return new ResponseEntity<String>("Booking deleted successfully", HttpStatus.OK);
    }
    
	@ApiOperation(value = "Update bookings REST API")
//	@PreAuthorize("hasRole('ADMIN')")
	@PutMapping("{id}")
    public ResponseEntity<String> updateBookingById(@PathVariable (value= "id") String id){
    	bookingService.updateBookingById(id);
    	return new ResponseEntity<String>("Booking updated successfully", HttpStatus.OK);
    }
    
	@ApiOperation(value = "Reschedule bookings REST API")
//	@PreAuthorize("hasRole('USER')")
    @PutMapping("{id}/reschedule")
    public ResponseEntity<ResponseEntityDto> rescheduleUserBooking(@PathVariable (value= "id") String id, @Valid @RequestBody 
    		BookingDto bookingDto){
    	
    	return new ResponseEntity<ResponseEntityDto>(bookingService.rescheduleUserBooking(id, bookingDto),HttpStatus.OK);
    }
    
	@ApiOperation(value = "Fetch booking of the particular user REST API")
//	@PreAuthorize("hasRole('USER')")
    @GetMapping("/guest/{id}")
    public List<BookingDto> getListOfBookingBasedOnGuestId(@PathVariable (value = "id") int id){
    	return bookingService.getAllBookingListWithGuestId(id);
    }
}
