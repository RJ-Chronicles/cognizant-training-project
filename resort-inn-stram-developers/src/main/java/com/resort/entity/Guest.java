package com.resort.entity;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor

@Entity
@Table(name="guest",uniqueConstraints = {
		@UniqueConstraint(columnNames= {"email"})
})
public class Guest {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="guest_id")
	private int id;
	
	@Column(name="name")
	private String fullName;
		
	@Column(name="email")
	private String email;
		
	@Column(name="password")
	private String password;
	
	@Column(name="contact")
	private String contact;
	
	private LocalDate registeredDate;
	
	@ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinTable(name= "user_roles",
	joinColumns=@JoinColumn (name="guest_id", referencedColumnName="guest_id"),
	inverseJoinColumns= @JoinColumn(name="role_id", referencedColumnName = "role_id"))
	private Set<Roles> role;
	
	@OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
	private Set<Feedback> feebacks = new HashSet<>();
	
	
	@OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
	private Set<Booking> bookings = new HashSet<>();
	
}
