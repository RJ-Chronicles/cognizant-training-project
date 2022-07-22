package com.resort.entity;

import java.time.LocalDate;


import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor

@Entity
@Table(name="guest_temp")
public class GuestTemp {

	@Id
	private String email;
	private String fullName;
	private String password;
	private String contact;
	private LocalDate registeredDate;
	private int OTP;
}
