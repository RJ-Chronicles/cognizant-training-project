package com.resort.repository;

import java.util.List;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.resort.entity.Feedback;



@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, Integer> {
	List<Feedback> findByGuestId(int guestId);
	List<Feedback> findByStatus(String status);
}
