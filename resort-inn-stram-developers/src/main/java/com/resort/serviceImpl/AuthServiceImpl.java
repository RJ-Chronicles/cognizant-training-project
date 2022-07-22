package com.resort.serviceImpl;

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.resort.entity.Guest;
import com.resort.entity.GuestTemp;
import com.resort.entity.Roles;
import com.resort.exception.ResortAPIException;
import com.resort.exception.UserExistException;
import com.resort.payload.LoginDto;
import com.resort.payload.Otp;
import com.resort.payload.SignUpDto;
import com.resort.repository.GuestRepository;
import com.resort.repository.GuestTempRepository;
import com.resort.repository.RolesRepository;
import com.resort.security.JwtTokenProvider;
import com.resort.service.AuthService;
import com.resort.utils.MailServiceUtil;
import com.resort.utils.ProjectConstantUtil;

@Service
public class AuthServiceImpl implements AuthService{


	private GuestTempRepository guestTempRepository;
	
	private MailServiceUtil mailServiceUtil;

    private AuthenticationManager authenticationManager;

    private GuestRepository userRepository;

    private RolesRepository roleRepository;

    private PasswordEncoder passwordEncoder;

    private JwtTokenProvider tokenProvider;
    public AuthServiceImpl(JwtTokenProvider tokenProvider,PasswordEncoder passwordEncoder,
    		RolesRepository roleRepository,GuestRepository userRepository,
    		AuthenticationManager authenticationManager,MailServiceUtil mailServiceUtil,
    		GuestTempRepository guestTempRepository) {
    	this.tokenProvider = tokenProvider;
    	this.passwordEncoder = passwordEncoder;
    	this.roleRepository = roleRepository;
    	this.userRepository = userRepository;
    	this.authenticationManager = authenticationManager;
    	this.mailServiceUtil = mailServiceUtil;
    	this.guestTempRepository = guestTempRepository;
    	
    }
	@Override
	public String authenticateUserCredentials(LoginDto loginDto) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                loginDto.getEmail(), loginDto.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        // get token form tokenProvider
        String token = tokenProvider.generateToken(authentication);
        return token;
	}
	@Override
	public Otp signUpUser(SignUpDto signUpDto) {
		

        if(guestTempRepository.existsById(signUpDto.getEmail())) {
        	guestTempRepository.deleteById(signUpDto.getEmail());
        }
       
        String otp = mailServiceUtil.sendEmail(signUpDto.getEmail(),ProjectConstantUtil.SIGNUP);
        
        GuestTemp temp = new GuestTemp();
        temp.setFullName(signUpDto.getFullName());

       
        temp.setContact(signUpDto.getContact());
        temp.setEmail(signUpDto.getEmail());
        temp.setPassword(passwordEncoder.encode(signUpDto.getPassword()));
        temp.setOTP(Integer.parseInt(otp));
        temp.setRegisteredDate(LocalDate.now());

        Otp oneTimePassword = new Otp();
        oneTimePassword.setOtp(Integer.parseInt(otp));
        //userRepository.save(user);
        guestTempRepository.save(temp);
        
        return oneTimePassword;
	}
	@Override
	public String validateEmailWithOtp(Otp otp) {
		// TODO Auto-generated method stub
		Optional<GuestTemp> guestSaved = guestTempRepository.findByOTP(otp.getOtp());

    	Guest guest = new Guest();
    	if(guestSaved.isPresent()) {
    		List<GuestTemp> list =Collections.singletonList(guestSaved.get()); 
    		 if(userRepository.existsByEmail(list.get(0).getEmail())){
    			 throw new ResortAPIException(HttpStatus.BAD_REQUEST, "User name is already taken");
             }
    		 if(otp.getOtp()== list.get(0).getOTP()) {
    			
        		 guest.setContact(list.get(0).getContact());
        		 guest.setEmail(list.get(0).getEmail());
        		 guest.setPassword(list.get(0).getPassword());
        		 guest.setFullName(list.get(0).getFullName());
        		 
        		 guest.setRegisteredDate(list.get(0).getRegisteredDate()); 
        		 String domain = guest.getEmail().substring(guest.getEmail().lastIndexOf("@")+1,guest.getEmail().lastIndexOf("."));
        		 Roles roles = null;
        		 if(domain.equalsIgnoreCase("cognizant")){
        			 roles = roleRepository.findByName("ROLE_ADMIN").get();
        		 }else {
        			 roles = roleRepository.findByName("ROLE_USER").get();
        		 }
        		 
        	     guest.setRole(Collections.singleton(roles));
        		 userRepository.save(guest);
        		 return ("User registered successfully");
    		 }else {
    			 throw new ResortAPIException(HttpStatus.BAD_REQUEST, "Invalid Otp..!");
    	             
    		 }
    		 
    	}
    	
    	
     	throw new ResortAPIException(HttpStatus.BAD_REQUEST, "Invalid Otp..!");
        
	}
	@Override
	public Otp forgetPassword(LoginDto loginDto) {
		  if(guestTempRepository.existsById(loginDto.getEmail())) {
	        	guestTempRepository.deleteById(loginDto.getEmail());
	        }
		  String otp = mailServiceUtil.sendEmail(loginDto.getEmail(), ProjectConstantUtil.FORGETPASSWORD);
	        
	        GuestTemp temp = new GuestTemp();
	        temp.setEmail(loginDto.getEmail());
	        temp.setPassword(passwordEncoder.encode(loginDto.getPassword()));
	        temp.setOTP(Integer.parseInt(otp));
	        Otp oneTimePassword = new Otp();
	        oneTimePassword.setOtp(Integer.parseInt(otp));
	        //userRepository.save(user);
	        guestTempRepository.save(temp);
	        
	        return oneTimePassword;
	}
	@Override
	public String resetPasswordOtp(Otp otp) {
		Optional<GuestTemp> guestSaved = guestTempRepository.findByOTP(otp.getOtp());

    	Guest guest = new Guest();
    	if(guestSaved.isPresent()) {
    		List<GuestTemp> list =Collections.singletonList(guestSaved.get()); 
    		Optional<Guest> guestOrigin = userRepository.findByEmail(list.get(0).getEmail());
    		List<Guest> user =Collections.singletonList(guestOrigin.get()); 
    		
    		guest.setContact(user.get(0).getContact());
    		guest.setFullName(user.get(0).getFullName());
    		guest.setRole(user.get(0).getRole());
    		guest.setId(user.get(0).getId());
    		guest.setEmail(user.get(0).getEmail());
    		guest.setPassword(list.get(0).getPassword());
    		
    		userRepository.save(guest);
    		return ("password updated successfully");
    	}
    	throw new UserExistException(HttpStatus.BAD_REQUEST, "Invalid Otp..!");
	}

}
