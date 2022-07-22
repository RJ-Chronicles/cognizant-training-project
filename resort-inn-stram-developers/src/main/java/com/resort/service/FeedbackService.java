package com.resort.service;

import java.util.List;

import com.resort.payload.FeedbackDto;

public interface FeedbackService {
	
	public FeedbackDto insertNewFeedback(int guest_id, FeedbackDto feedbackDto);
	
	public List<FeedbackDto> findAllFeedbackByGuestId(int guestId);
	public List<FeedbackDto> getFeedbackByStatus();
	
	void deleteFeedback(int guesttId, int feedbackId);
	
	public List<FeedbackDto> getAllFeedback();
	
	public void deleteFeedbackById(int id);
	
	public void updateFeedbackById(int id);
}
