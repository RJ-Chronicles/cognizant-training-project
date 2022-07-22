package com.resort.payload;

import lombok.Data;

@Data
public class RoomDto {
	private int id;
	private double dailyCharge;
	private String roomDescription;
	private String imagePath;
}
