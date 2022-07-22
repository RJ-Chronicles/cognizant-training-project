package com.resort.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.resort.entity.Transaction;
import com.resort.payload.TransactionDto;

public interface TransactionRepository extends JpaRepository<Transaction, Integer> {
	public List<TransactionDto> findByBookingId(int bookingId);
	@Query(value = "SELECT SUM(payment) FROM transaction", nativeQuery = true)
	Long selectTotalAmount();
}
