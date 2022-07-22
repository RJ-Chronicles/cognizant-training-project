package com.resort.serviceImpl;

import java.time.temporal.ChronoUnit;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;
import com.resort.payload.BookingResponseDto;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import com.resort.repository.BookingRepository;
import com.resort.entity.Booking;
import com.resort.entity.Guest;
import com.resort.entity.Room;

import com.resort.exception.ResortAPIException;
import com.resort.exception.ResourceNotFound;
import com.resort.payload.BookingDto;
import com.resort.payload.ResponseEntityDto;
import com.resort.repository.GuestRepository;
import com.resort.repository.RoomRepository;

import com.resort.service.BookingService;
import com.resort.utils.MailServiceUtil;
import com.resort.utils.ProjectConstantUtil;



@Service
public class BookingServiceImpl implements BookingService{
	private static final Logger log = LoggerFactory.getLogger(BookingServiceImpl.class);
	private ModelMapper mapper;
	
	private GuestRepository guestRepository;
	private BookingRepository bookingRepository;
	private RoomRepository roomRepository;
	private MailServiceUtil mailServiceUtil;
	
	public BookingServiceImpl(ModelMapper mapper,GuestRepository guestRepository ,
			BookingRepository bookingRepository, RoomRepository roomRepository,MailServiceUtil mailServiceUtil) {
		this.mapper=mapper;
		this.guestRepository= guestRepository;
		this.roomRepository=roomRepository;
		this.bookingRepository = bookingRepository;
		this.mailServiceUtil = mailServiceUtil;
	}
	@Override
	public BookingResponseDto registerNewGuestBooking(BookingDto bookingDto, int guestId) {
		Guest guest = guestRepository.findById(guestId).orElseThrow(()-> new ResourceNotFound("Guest","id",guestId));
		List<Booking> checkInBooking = bookingRepository.findAllByCheckOutBetweenAndRoomId(bookingDto.getCheckIn(), bookingDto.getCheckOut(), bookingDto.getRoomId());
		log.error("checkin error :   "+checkInBooking.toString());
		
		if(checkInBooking.isEmpty()) {
			List<Booking> checkOutBooking = bookingRepository.findAllByCheckOutBetweenAndRoomId(bookingDto.getCheckIn(), bookingDto.getCheckOut(), bookingDto.getRoomId());
			if(checkOutBooking.isEmpty()) {
				log.error("check OUt error : " + checkOutBooking.toString());
				Booking booking = mapToBooking(bookingDto);
				 //UUID randomUUID = UUID.randomUUID();
				 String bookId  =  UUID.randomUUID().toString();
				 booking.setId(bookId);
				booking.setGuest(guest);
				long noOfDayBetween = ChronoUnit.DAYS.between(bookingDto.getCheckIn(), bookingDto.getCheckOut());
				Optional<Room> roomDetail = roomRepository.findById(bookingDto.getRoomId());
				double oneDayAount = roomDetail.get().getDailyCharge();
				System.out.println("Total Amount you need to pay :        "+  ++noOfDayBetween * oneDayAount);
				mailServiceUtil.sendEmail(guest.getEmail(),ProjectConstantUtil.PAYMENT + "Total Amount you need to pay : "+noOfDayBetween * oneDayAount);
				mapToBookingDto(bookingRepository.save(booking));
				BookingResponseDto bookingResponse = new BookingResponseDto();
				bookingResponse.setAmount(noOfDayBetween * oneDayAount);
				bookingResponse.setBookingId(bookId);
				return bookingResponse;
			}
			System.out.println("Checking Booking :  " +checkOutBooking );
		}
		System.out.println("CheckOUt Booking :   "+ checkInBooking);
		throw new ResortAPIException(HttpStatus.BAD_REQUEST, "Booking exist for given date ");
        
	}
	
	@Override
	public void deleteBookingById(String id) {
		// TODO Auto-generated method stub
		Booking booking = 	bookingRepository.findById(id).orElseThrow(()-> new ResourceNotFound("Booking","id",0));
		mailServiceUtil.sendEmail(booking.getGuest().getEmail(),ProjectConstantUtil.CANCELLATION);
		bookingRepository.deleteById(id);
	}
	@Override
	public void updateBookingById(String id) {
		Booking booking = bookingRepository.findById(id).orElseThrow(()-> new ResourceNotFound("Booking","id",0));
		booking.setStatus("Accepted");			
		bookingRepository.save(booking);
	}
	@Override
	public ResponseEntityDto rescheduleUserBooking(String id, BookingDto bookingDto) {
		// TODO Auto-generated method stub
		Booking booking = bookingRepository.findById(id).orElseThrow(()-> new ResourceNotFound("Booking","id",0));
		Booking rescheduleBooking = new Booking();
		rescheduleBooking.setAddress(booking.getAddress());
		rescheduleBooking.setId(booking.getId());
		rescheduleBooking.setCheckIn(bookingDto.getCheckIn());
		rescheduleBooking.setCheckOut(bookingDto.getCheckOut());
		rescheduleBooking.setRoomId(bookingDto.getRoomId());
		rescheduleBooking.setGuest(booking.getGuest());
		rescheduleBooking.setStatus("Pending");
		bookingRepository.save(rescheduleBooking);
		mailServiceUtil.sendEmail(booking.getGuest().getEmail(),ProjectConstantUtil.RESCHEDULE);
		
		return new ResponseEntityDto("Your booking has been successfully reschedule");
	}
	@Override
	public List<BookingDto> getAllBookingListWithGuestId(int id) {
		if(bookingRepository.existsByGuestId(id)) {
			List<Booking> booking = bookingRepository.findByGuestId(id);//.orElseThrow(()-> );
			return booking.stream().map(book-> mapToBookingDto(book)).collect(Collectors.toList());
		
		}
		throw new ResourceNotFound("Booking","id",id);
	}

	@Override
	public BookingDto updateExisingBooking(BookingDto bookingDto, int guest_id, int transaction_id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void deleteGuestBooking(String booking_id, int guest_id, int transaction_id) {
		// TODO Auto-generated method stub
		
	}
	
	@Override
	public List<BookingDto> getAllBookingList() {
		return bookingRepository.findAll().stream().map(b -> mapToBookingDto(b)).collect(Collectors.toList());
	}
	
	public Booking mapToBooking(BookingDto bookingDto) {
		Booking booking = mapper.map(bookingDto, Booking.class);
		return booking;
	}
	
	public BookingDto mapToBookingDto(Booking booking) {
		BookingDto bookingDto = mapper.map(booking, BookingDto.class);
		return bookingDto;
	}
	




}
