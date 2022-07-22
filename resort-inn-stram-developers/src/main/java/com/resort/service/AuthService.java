package com.resort.service;

import com.resort.payload.LoginDto;
import com.resort.payload.Otp;
import com.resort.payload.SignUpDto;

public interface AuthService {
	public String authenticateUserCredentials(LoginDto loginDto);
	public Otp signUpUser(SignUpDto signupDto);
	public String validateEmailWithOtp(Otp otp);
	public Otp forgetPassword(LoginDto loginDto);
	public String resetPasswordOtp(Otp otp);
}
