package com.resort.serviceImpl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.resort.entity.Room;
import com.resort.exception.ResourceNotFound;
import com.resort.payload.RoomDto;
import com.resort.repository.RoomRepository;
import com.resort.service.RoomService;
@Service
public class RoomServiceImpl implements RoomService {

	private ModelMapper mapper;
	private RoomRepository roomRepository;
	public RoomServiceImpl(ModelMapper mapper, RoomRepository roomRepository) {
		this.mapper = mapper;
		this.roomRepository = roomRepository;
	}
	@Override
	public RoomDto createRoomRecord(RoomDto roomDto) {
		Room room = mapToRoom(roomDto);
		return mapToRoomDto( roomRepository.save(room));
	}

	@Override
	public List<RoomDto> getAllRoomDetails() {
		List<Room> rooms = roomRepository.findAll();
		return rooms.stream().map(room -> mapToRoomDto(room)).collect(Collectors.toList());
	}

	@Override
	public RoomDto getRoomById(int id) {
		Room room = roomRepository.findById(id).orElseThrow(()-> new ResourceNotFound ("Room ", "id", id));
		return mapToRoomDto( room);
	}

	@Override
	public RoomDto updateRoomById(RoomDto roomDto, int id) {

        // get post by id from the database
        Room room = roomRepository.findById(id).orElseThrow(() -> new ResourceNotFound("Room", "id", id));

        room.setDailyCharge(roomDto.getDailyCharge());
        room.setImagePath(roomDto.getImagePath());
      
        room.setRoomDescription(roomDto.getRoomDescription());



        Room updatedRoom = roomRepository.save(room);
        return mapToRoomDto(updatedRoom);
	}

	@Override
	public void deleteRoomById(int id) {
		// TODO Auto-generated method stub
		Room room = roomRepository.findById(id).orElseThrow(()-> new ResourceNotFound ("Room ", "id", id));
		roomRepository.delete(room);
	}
	
	public Room mapToRoom(RoomDto roomDto) {
		Room room = mapper.map(roomDto, Room.class);
		return room;
	}
	
	public RoomDto mapToRoomDto(Room room) {
		RoomDto roomDto = mapper.map(room, RoomDto.class);
		return roomDto;
	}

}
