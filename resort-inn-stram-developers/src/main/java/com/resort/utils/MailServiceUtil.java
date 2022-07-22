package com.resort.utils;

import java.util.Random;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class MailServiceUtil {

	@Autowired
	private JavaMailSender javaMailSender;

	
	public MailServiceUtil(JavaMailSender javaMailSender) {
		this.javaMailSender = javaMailSender;
	}

	public String  sendEmail(String uemail, String message) throws MailException {
		SimpleMailMessage mail = new SimpleMailMessage();
		String str = "";
		String verify = "";
		mail.setTo(uemail);
		mail.setSubject("Greeting from stram Developers");
		if(message.equalsIgnoreCase(ProjectConstantUtil.SIGNUP) || message.equalsIgnoreCase(ProjectConstantUtil.FORGETPASSWORD)) {
			Random rnd = new Random();
			int number = rnd.nextInt(999999);

			str= String.format("%06d", number);
			verify = "Verify your mail id with given OTP.:  "+ str;
		}
		mail.setText(message + verify);
		javaMailSender.send(mail);
		return str;
	}
	public void sendEmailWithAttachment(String user) throws 		MailException, MessagingException {

		MimeMessage mimeMessage = javaMailSender.createMimeMessage();
		
		MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);

		helper.setTo(user);
		helper.setSubject("Testing Mail API with Attachment");
		helper.setText("Please find the attached document below.");

		ClassPathResource classPathResource = new ClassPathResource("Attachment.pdf");
		helper.addAttachment(classPathResource.getFilename(), classPathResource);

		javaMailSender.send(mimeMessage);
	}
}

