package com.resort.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.resort.entity.Roles;

public interface RolesRepository extends JpaRepository<Roles, Integer> {
	public Optional<Roles> findByName(String name);
	public boolean existsByName(String name);
}
