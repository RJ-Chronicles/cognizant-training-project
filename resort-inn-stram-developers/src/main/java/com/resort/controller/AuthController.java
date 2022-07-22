package com.resort.controller;


import java.util.Collections;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.resort.service.AuthService;



import com.resort.entity.Guest;

import com.resort.payload.JwtAuthResponse;
import com.resort.payload.JwtResponseAndUserDetails;
import com.resort.payload.LoginDto;
import com.resort.payload.Otp;
import com.resort.payload.SignUpDto;
import com.resort.repository.GuestRepository;

@RestController
@RequestMapping("/api/v1/auth")
@CrossOrigin(origins= "http://localhost:3000")
public class AuthController {

	private AuthService authServiceImpl;

    private GuestRepository userRepository;
    public AuthController(GuestRepository userRepository, AuthService authServiceImpl) {
    	this.userRepository=userRepository;
    	this.authServiceImpl=authServiceImpl;
    }

    @PostMapping("/signin")
    public ResponseEntity<JwtResponseAndUserDetails> authenticateUser(@Valid @RequestBody LoginDto loginDto){
    	JwtAuthResponse entity = new JwtAuthResponse(authServiceImpl.authenticateUserCredentials(loginDto));
    	Optional<Guest> guest = userRepository.findByEmail(loginDto.getEmail());
    	List<Guest> list =Collections.singletonList(guest.get()); 
        return ResponseEntity.ok( JwtResponseAndUserDetailsMetho(entity , list));
    }

    private JwtResponseAndUserDetails JwtResponseAndUserDetailsMetho(JwtAuthResponse entitity , List<Guest>  guest) {
    	JwtResponseAndUserDetails response = new JwtResponseAndUserDetails();
    	response.setContact(guest.get(0).getContact());
    	response.setRole(guest.get(0).getRole());
    	response.setEmail(guest.get(0).getEmail());
    	response.setJwtAuthResponse(entitity);
    	response.setFullName(guest.get(0).getFullName());
    	response.setId(guest.get(0).getId());
		// TODO Auto-generated method stub
		return response;
	}

	@PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpDto signUpDto){
    	System.out.println(signUpDto);
         if(userRepository.existsByEmail(signUpDto.getEmail())){
            return new ResponseEntity<>("Username is already taken!", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<Otp>(authServiceImpl.signUpUser(signUpDto),HttpStatus.CREATED);

    }
    
    @PostMapping("/otp-validation")
    public ResponseEntity<?> registerUserAfterValidation(@RequestBody Otp otp) {    	
    	return new ResponseEntity<>(authServiceImpl.validateEmailWithOtp(otp), HttpStatus.CREATED);
    
    }
    
    @PostMapping("/forget-password")
    public ResponseEntity<?> resetPassword(@Valid @RequestBody LoginDto loginDto){
    	  if(! userRepository.existsByEmail(loginDto.getEmail())){
              return new ResponseEntity<>("Username is not found with " + loginDto.getEmail(), HttpStatus.BAD_REQUEST);
          }
    	  return new ResponseEntity<>(authServiceImpl.forgetPassword(loginDto), HttpStatus.CREATED);
    }
    
    @PostMapping("/reset-password-otp")
    public ResponseEntity<?> resetPasswordOtp(@RequestBody Otp otp) {    	
    	return new ResponseEntity<>(authServiceImpl.resetPasswordOtp(otp), HttpStatus.CREATED);
    
    }
    
}
