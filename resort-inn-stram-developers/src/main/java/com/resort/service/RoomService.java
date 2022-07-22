package com.resort.service;

import java.util.List;

import com.resort.payload.RoomDto;


public interface RoomService {
	RoomDto createRoomRecord(RoomDto roomDto);
	
	List<RoomDto> getAllRoomDetails();

	RoomDto getRoomById(int id);
	
	RoomDto updateRoomById(RoomDto roomDto, int id);
	
	void deleteRoomById(int id);
	
}
