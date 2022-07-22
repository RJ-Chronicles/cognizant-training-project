package com.resort.serviceImpl;



import org.modelmapper.ModelMapper;

import org.springframework.stereotype.Service;
import  com.resort.exception.ResourceNotFound;

import com.resort.entity.Guest;
import com.resort.payload.DashboardDto;
import com.resort.payload.GuestDto;
import com.resort.repository.BookingRepository;
//import com.resort.payload.GuestResponse;
import com.resort.repository.GuestRepository;
import com.resort.repository.TransactionRepository;
import com.resort.service.GuestService;





@Service
public class GuestServiceImpl implements GuestService {
	private BookingRepository bkRepo;
	private TransactionRepository trRepo;
    private GuestRepository guestRepository;
	private ModelMapper mapper;

	public GuestServiceImpl(GuestRepository guestRepository,ModelMapper mapper,TransactionRepository trRepo,
	BookingRepository bkRepo) {
	this.mapper= mapper;
	this.guestRepository= guestRepository;
	this.bkRepo = bkRepo;
	this.trRepo = trRepo;
	}
	
	public GuestDto addNewGuest(GuestDto guestDto) {
		Guest addedGuest =  guestRepository.save(mapToGuest(guestDto));
		return mapToGuestDto(addedGuest);
	}
	
	
	/*public GuestResponse findAllGuestList(int pageNo, int pageSize, String sortBy, String sortDir) {
		Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name())? Sort.by(sortBy).ascending() :
			Sort.by(sortBy).descending();
		
		Pageable pageable =PageRequest.of(pageNo, pageSize, sort);
		Page<Guest> guests =  guestRepository.findAll(pageable);
		List<Guest> listOfPages= guests.getContent();
		
		//List<GuestDto> content= listOfPages.stream().map(post-> mapToGuestDto(post)).collect(Collectors.toList());
		List<GuestDto> content = listOfPages.stream().map(guest-> mapToGuestDto(guest)).collect(Collectors.toList());
		GuestResponse guestResponse = new GuestResponse();
		guestResponse.setContent(content);
		guestResponse.setPageNo(guests.getNumber());
		guestResponse.setPageSize(guests.getSize());
		guestResponse.setTotalElements(guests.getTotalElements());
		guestResponse.setTotalpages(guests.getTotalPages());
		guestResponse.setLast(guests.isLast());
		
		return guestResponse;
	}
	*/
	@Override
	public DashboardDto getInfoForDashboard() {
	long guestCount = guestRepository.count();
	long amount = trRepo.selectTotalAmount();
	long bookingCount = bkRepo.count();

	DashboardDto dashboard = new DashboardDto();
	dashboard.setBookingCount(bookingCount);
	dashboard.setTransactionAmountTotal(amount);
	dashboard.setGuestCount(guestCount);
	return dashboard;
	}
	public GuestDto getGuestById(int id) {
		Guest guest = guestRepository.findById(id).orElseThrow(() -> new ResourceNotFound("Guest","id",id));
		return mapToGuestDto(guest);
	}
	public GuestDto updateGuestById(GuestDto guestDto, int id) {
		Guest guest = guestRepository.findById(id).orElseThrow(() -> new ResourceNotFound("Guest","id",id));
	
		guest.setContact(guestDto.getContact());
		guest.setEmail(guestDto.getEmail());
		guest.setFullName(guestDto.getFullName());

		guest.setPassword(guestDto.getPassword());
		
		Guest updatedGuest = guestRepository.save(guest);
		return mapToGuestDto(updatedGuest);
	}
	public void deleteGuestById(int id) {
		Guest guest = guestRepository.findById(id).orElseThrow(() -> new ResourceNotFound("post","id",id));
		guestRepository.delete(guest);
		
	}
	
	private GuestDto mapToGuestDto(Guest guest) {
		GuestDto guestDto = mapper.map(guest, GuestDto.class);
		return guestDto;
	}


	
	
	private Guest mapToGuest(GuestDto guestDto) {
		Guest guest = mapper.map(guestDto, Guest.class);
		return guest;
	}
	
	
}
