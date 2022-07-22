package com.resort.entity;

import java.time.LocalDate;


import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.FetchType;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import lombok.Data;

@Data
@Table (name="booking")
@Entity

public class Booking {
	@Id
	private String id;
	private LocalDate checkIn;
	private LocalDate checkOut;
	private String address;
	private int roomId;
	@Column(columnDefinition="varchar(50) default 'Pending'")
	private String status ;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "guestId" , nullable = false)
	private Guest guest;
	
//	@OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true ,mappedBy = "booking")
//	private Transaction transaction;
//	@OneToOne @JoinColumn(name="transaction_id") 
//	private Transaction transaction;
	@OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true ,mappedBy = "booking")
	private Transaction transaction;
	
	
	
}
