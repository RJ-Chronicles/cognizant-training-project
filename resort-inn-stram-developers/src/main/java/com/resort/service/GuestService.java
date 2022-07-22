package com.resort.service;


import com.resort.payload.DashboardDto;
import com.resort.payload.GuestDto;
//import com.resort.payload.GuestResponse;


public interface GuestService {
	public GuestDto addNewGuest(GuestDto guestDto);
	//public GuestResponse findAllGuestList(int pageNo, int pageSize,String sortBy, String sortDir);

	public DashboardDto getInfoForDashboard();
	public GuestDto getGuestById(int id);
	
	public GuestDto updateGuestById(GuestDto guestDto, int id);
	
	void deleteGuestById(int id);
}
