package com.resort.entity;


import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.Data;

@Data
@Table (name="transaction")
@Entity
public class Transaction {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private double payment;
	
//	@OneToOne(fetch = FetchType.EAGER)
//    @JoinColumn(name = "booking_id", referencedColumnName = "id" , nullable = false)
//	private Booking booking;
	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "booking_id", referencedColumnName = "id" , nullable = false)
	private Booking booking;
//	@OneToOne @JoinColumn(name="booking_id") 
//	private Booking booking;
	
}

