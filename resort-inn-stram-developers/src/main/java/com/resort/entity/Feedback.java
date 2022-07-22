package com.resort.entity;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Column;

import lombok.Data;

@Data
@Table (name="Feedback")
@Entity
public class Feedback {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private int rating;
	@Column(columnDefinition="varchar(1000) ")
	private String body;
	private String guest_name;
	@Column(columnDefinition="varchar(50) default 'Pending'")
	private String status;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "guestId" , nullable = false)
	private Guest guest; 
}
