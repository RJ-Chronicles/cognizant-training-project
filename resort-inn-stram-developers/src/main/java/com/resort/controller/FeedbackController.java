package com.resort.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import javax.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import com.resort.payload.FeedbackDto;
import com.resort.service.FeedbackService;

import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/api/v1/feedback")
@CrossOrigin(origins= "http://localhost:3000")
public class FeedbackController {
	private FeedbackService feedbackService;
	
	public FeedbackController(FeedbackService feedbackService) {
		this.feedbackService = feedbackService;
	}
	
	@ApiOperation(value = "Create feedback REST API")
//	@PreAuthorize("hasRole('USER')")
	@PostMapping("/{feedbackId}/feedback")
	public ResponseEntity<FeedbackDto>  createGuestFeedback(@PathVariable (value="feedbackId") int feedbackId,@RequestBody @Valid FeedbackDto feedbackDto) {
		return new ResponseEntity<FeedbackDto>(feedbackService.insertNewFeedback(feedbackId,feedbackDto), HttpStatus.CREATED);
		
	}
	
	@GetMapping("/feedback-by-status")
	public List<FeedbackDto> getAllServiceFeedbackByStatus(){
	return feedbackService.getFeedbackByStatus();
	}
	
	@ApiOperation(value = "Fetch feedback of particular user REST API")
//	@PreAuthorize("hasRole('USER')")
	@GetMapping("/{guestId}")
	public List<FeedbackDto> getAllFeedbackOfRespectiveGuest(@PathVariable (value="guestId") int guestId){
		return feedbackService.findAllFeedbackByGuestId(guestId);
	}
	
	@ApiOperation(value = "Delete Feedback REST API")
//	@PreAuthorize("hasRole('USER')")
    @DeleteMapping("/guest/{guestId}/feedback/{id}")
    public ResponseEntity<String> deleteComment(@PathVariable(value = "guestId") int guestId,
                                                @PathVariable(value = "id") int feedbackId){
        feedbackService.deleteFeedback(guestId, feedbackId);
        return new ResponseEntity<>("Comment deleted successfully", HttpStatus.OK);
    }
    
	@ApiOperation(value = "Fetch all feedback REST API")
//	@PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/getAll")
	    public List<FeedbackDto> getAllServiceFeedback(){
	    return feedbackService.getAllFeedback();
    }
    
	@ApiOperation(value = "Delete Feedback REST API")
//	@PreAuthorize("hasRole('USER')")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteFeedbackById(@PathVariable (value= "id") int id){
    	feedbackService.deleteFeedbackById(id);
    	return new ResponseEntity<String>("Feedback deleted successfully", HttpStatus.OK);
    }
    
	@ApiOperation(value = "Update Feedback REST API")
//	@PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/accept/{id}")
    public ResponseEntity<String> updateFeedbackById(@PathVariable (value= "id") int id){
    	feedbackService.updateFeedbackById(id);
    	return new ResponseEntity<String>("Feedback updated successfully", HttpStatus.OK);
    }
    
    
}
