package com.resort.entity;

import javax.persistence.Column;
import javax.persistence.Entity;

import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name="roles")
public class Roles {
	@Id
	//@GeneratedValue(strategy= GenerationType.IDENTITY)
	@Column( name="role_id")
	private int id;
	@Column(length =60)
	private String name;
}
