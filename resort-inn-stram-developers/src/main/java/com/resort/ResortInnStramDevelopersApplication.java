package com.resort;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.context.annotation.Bean;
import com.resort.entity.Roles;
import com.resort.repository.RolesRepository;

@SpringBootApplication
public class ResortInnStramDevelopersApplication implements ApplicationRunner {
	Logger logger = LoggerFactory.getLogger(ResortInnStramDevelopersApplication.class);
	@Autowired
	private RolesRepository roleRepo;
	@Bean
	public ModelMapper modelMapper() {
		return new ModelMapper();
	}
	public static void main(String[] args) {
		SpringApplication.run(ResortInnStramDevelopersApplication.class, args);		
	}
	@Override
	public void run(ApplicationArguments args) throws Exception {
		logger.error("Server is running on port number 8080.");
		// TODO Auto-generated method stub
		Roles admin = new Roles(1, "ROLE_ADMIN");
		if(!roleRepo.existsByName("ROLE_ADMIN")) {
			roleRepo.save(admin);
		}
		
		Roles user = new Roles(2, "ROLE_USER");
		if(!roleRepo.existsByName("ROLE_USER")) {
			roleRepo.save(user);
		}
		
		
	}
	


}
