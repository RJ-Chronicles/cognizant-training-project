package com.resort.serviceImpl;


import java.util.List;

import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.resort.entity.Feedback;
import com.resort.entity.Guest;
import com.resort.payload.FeedbackDto;
import com.resort.repository.FeedbackRepository;
import com.resort.repository.GuestRepository;
import com.resort.service.FeedbackService;
import com.resort.exception.ResortAPIException;
import com.resort.exception.ResourceNotFound;

@Service
public class FeebackServiceImpl implements FeedbackService {

	private ModelMapper mapper;
	private FeedbackRepository feedbackRepository;
	private GuestRepository guestRepository;
	
	public FeebackServiceImpl(FeedbackRepository feedbackRepository, ModelMapper mapper,GuestRepository guestRepository ) {
		this.mapper=mapper;
		this.feedbackRepository=feedbackRepository;
		this.guestRepository= guestRepository;
	}
	@Override
	public FeedbackDto insertNewFeedback(int guestId, FeedbackDto feedbackDto) {
		Guest guest = guestRepository.findById(guestId).orElseThrow(()-> new ResourceNotFound("Guest","id",guestId));
		Feedback feedback = mapToFeedback(feedbackDto);
		feedback.setGuest(guest);
		Feedback newFeedback = feedbackRepository.save(feedback);
		return mapToFeedbackDto(newFeedback);
	}

	@Override
	public List<FeedbackDto> findAllFeedbackByGuestId(int guestId) {
		List<Feedback> feedbacks = feedbackRepository.findByGuestId(guestId);
		
		return feedbacks.stream().map(comment-> mapToFeedbackDto(comment)).collect(Collectors.toList());
	
	}

	@Override
	public void deleteFeedback(int guesttId, int feedbackId) {
		// retrieve guest entity by id
        Guest guest = guestRepository.findById(guesttId).orElseThrow(
                () -> new ResourceNotFound("Guest", "id", guesttId));

        // retrieve feedback by id
        Feedback feedback = feedbackRepository.findById(feedbackId).orElseThrow(() ->
                new ResourceNotFound("Feedback", "id", feedbackId));
       
        if(feedback.getGuest().getId() !=(guest.getId())) {
        	throw new ResortAPIException(HttpStatus.BAD_REQUEST, "feedback does not belongs to guest");
        }

        feedbackRepository.delete(feedback);
		
	}
	
	
	

	@Override
	public List<FeedbackDto> getAllFeedback() {
		List<Feedback> feedbacks = feedbackRepository.findAll();
		return feedbacks.stream().map(comment-> mapToFeedbackDto(comment)).collect(Collectors.toList());
	}
	@Override
	public void deleteFeedbackById(int id) {
		// TODO Auto-generated method stub
		feedbackRepository.findById(id).orElseThrow(()-> new ResourceNotFound("Feedback","id",id));
		feedbackRepository.deleteById(id);
	}
	@Override
	public void updateFeedbackById(int id) {
		// TODO Auto-generated method stub
		Feedback feedback = feedbackRepository.findById(id).orElseThrow(()-> new ResourceNotFound("Feedback","id",id));
		feedback.setStatus("Accepted");
		
		feedbackRepository.save(feedback);
		
	}

	@Override
	public List<FeedbackDto> getFeedbackByStatus() {
		
		List<Feedback> feedback = feedbackRepository.findByStatus("Accepted");
		return feedback.stream().map(item-> mapToFeedbackDto(item)).collect(Collectors.toList());
	}



	public Feedback mapToFeedback(FeedbackDto feedbackDto) {
		Feedback feedback = mapper.map(feedbackDto, Feedback.class);
		return feedback;
	}
	
	public FeedbackDto mapToFeedbackDto(Feedback feedback) {
		FeedbackDto feebackDto = mapper.map(feedback, FeedbackDto.class);
		return feebackDto;
	}
	
}
