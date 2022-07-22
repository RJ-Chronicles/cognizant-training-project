package com.resort.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Data
@Table(name="Room")
@Entity
public class Room {
	@Id
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	private int id;
	private double dailyCharge;
	


	@Column(columnDefinition="varchar(1000)")
	private String roomDescription;
	private String imagePath;
}
