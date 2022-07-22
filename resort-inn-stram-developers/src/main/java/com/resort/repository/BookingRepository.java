package com.resort.repository;

import java.time.LocalDate;
import java.util.List;


import org.springframework.data.jpa.repository.JpaRepository;

import com.resort.entity.Booking;

public interface BookingRepository extends JpaRepository<Booking, String> {
	public List<Booking> findByGuestId(int id);
	public boolean existsByGuestId(int id);
	public List<Booking> findAllByCheckInBetween(LocalDate checkIn, LocalDate checkOut);
	public List<Booking> findAllByCheckOutBetween(LocalDate checkIn, LocalDate checkOut);
	
	public List<Booking> findAllByCheckInBetweenAndRoomId(LocalDate checkIn, LocalDate checkOut, int RoomId);
	public List<Booking> findAllByCheckOutBetweenAndRoomId(LocalDate checkIn, LocalDate checkOut, int RoomId);
}
