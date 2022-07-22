package com.resort.service;

import java.util.Optional;

import com.resort.entity.GuestTemp;

public interface GuestTempService {
	public Optional<GuestTemp> getTemporaryGuestData(String email);
	public void addGuestTemporary(GuestTemp guestTemp);
	public void deleteTEmporary(String email);
	//public Optional<GuestTemp> findTheGuestByOTP( int otp);
}
