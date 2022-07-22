package com.resort.payload;

import java.util.Set;

import com.resort.entity.Roles;

import lombok.Data;

@Data
public class JwtResponseAndUserDetails {

private String  fullName;
private String email ;
private String contact ;
private int id ;
private Set<Roles> role ;
private JwtAuthResponse jwtAuthResponse;
}
