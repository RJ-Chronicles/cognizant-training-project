package com.resort.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.resort.entity.GuestTemp;

public interface GuestTempRepository extends JpaRepository<GuestTemp , String> {
	public Optional<GuestTemp> findByOTP(int otp);
}
