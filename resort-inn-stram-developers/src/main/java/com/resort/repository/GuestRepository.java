package com.resort.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.resort.entity.Guest;

public interface GuestRepository extends JpaRepository<Guest, Integer> {
	Optional<Guest> findByEmail(String email);
	Optional<Guest> findByEmailAndPassword(String email, String password);
	Boolean existsByEmail(String email);
}
