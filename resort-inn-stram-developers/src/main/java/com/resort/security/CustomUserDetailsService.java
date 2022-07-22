package com.resort.security;

import com.resort.entity.Guest;
import com.resort.entity.Roles;
import com.resort.repository.GuestRepository;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class CustomUserDetailsService implements UserDetailsService {
private GuestRepository guestRepository;
	
	public CustomUserDetailsService(GuestRepository guestRepository) {
		this.guestRepository= guestRepository;
	}
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		Guest user = guestRepository.findByEmail(email)
		.orElseThrow(()-> new UsernameNotFoundException("User Not found with email :"+email));
		
		return new User(user.getEmail(),user.getPassword(), mapRolesToAuhorities(user.getRole()));
	}
	
	private Collection<? extends GrantedAuthority> mapRolesToAuhorities(Set<Roles> roles){
		return roles.stream().map(role -> new SimpleGrantedAuthority(role.getName())).collect(Collectors.toList());	
	}

}
