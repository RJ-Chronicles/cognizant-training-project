package com.resort.controller;

import java.util.List;

import javax.validation.Valid;

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

import com.resort.payload.RoomDto;
import com.resort.service.RoomService;


@RestController
@RequestMapping("/api/v1/rooms")
@CrossOrigin(origins= "http://localhost:3000")
public class RoomController {
	private RoomService roomService;
	
	public RoomController(RoomService roomService) {
		this.roomService =roomService; 
	}
	@PostMapping
	public ResponseEntity<RoomDto> createNewResortRoom(@Valid @RequestBody RoomDto roomDto){
		 return new ResponseEntity<>(roomService.createRoomRecord(roomDto), HttpStatus.CREATED);
	}
	
	@GetMapping("/roomId")
	public List<RoomDto> discoverAllRoomRecords(){
		return roomService.getAllRoomDetails();
	}
	
	@GetMapping("{id}")
	public ResponseEntity<RoomDto> getRoomRecordById(@PathVariable (name ="id") int id){
		return ResponseEntity.ok(roomService.getRoomById(id));
	}
	@PutMapping("/update/{id}")
	public ResponseEntity<RoomDto> updaterRoomRecordBasedOnId
	(@RequestBody RoomDto roomDto, @PathVariable (name="id") int id){
		return new ResponseEntity<>(roomService.updateRoomById(roomDto, id), HttpStatus.OK);
	}
	
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<String> deletePost(@PathVariable (name="id") int id){
		roomService.deleteRoomById(id);
		return new ResponseEntity<>("Room entity deleted successfully.", HttpStatus.OK);
	}
}
