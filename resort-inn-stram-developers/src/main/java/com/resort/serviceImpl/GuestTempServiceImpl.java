package com.resort.serviceImpl;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.resort.entity.GuestTemp;
import com.resort.repository.GuestTempRepository;
import com.resort.service.GuestTempService;
@Service
public class GuestTempServiceImpl implements GuestTempService {

	private GuestTempRepository guestTempRepository;
	public GuestTempServiceImpl(GuestTempRepository guestTempRepository) {
		this.guestTempRepository = guestTempRepository;
	}
	@Override
	public Optional<GuestTemp> getTemporaryGuestData(String email) {
		// TODO Auto-generated method stub
		return guestTempRepository.findById(email);
	}

	@Override
	public void addGuestTemporary(GuestTemp guestTemp) {
		guestTempRepository.save(guestTemp);
		
	}

	@Override
	public void deleteTEmporary(String email) {
		// TODO Auto-generated method stub
		guestTempRepository.deleteById(email);
	}

}
