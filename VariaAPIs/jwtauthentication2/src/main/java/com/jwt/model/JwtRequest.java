package com.jwt.model;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class JwtRequest {
	
	String mobileNumber;
	String username;
	String password;
	
//	@Autowired
//	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	public JwtRequest() {
		//super();
		// TODO Auto-generated constructor stub
	}


//	public JwtRequest(String mobileNumber, String password) {
////		super();
//		this.mobileNumber = mobileNumber;
//		this.password = password;
//	}
//
//
//	public String getMobileNumber() {
//		return mobileNumber;
//	}
//
//
//	public void setMobileNumber(String mobileNumber) {
//		this.mobileNumber = mobileNumber;
//	}
//
//
//	public String getPassword() {
//		return password;
//	}
//
//
//	public void setPassword(String password) {
//		this.password = password;
//	}
//
//
//	@Override
//	public String toString() {
//		return "JwtRequest [username=" + mobileNumber + ", password=" + password + "]";
//	}
//


	


	

	public JwtRequest(String username, String password) {
//		super();
		this.username = username;
		this.password = password;
	}


	public String getUsername() {
		return username;
	}


	public void setUsername(String username) {
		this.username = username;
	}


	public String getPassword() {
		return password;
	}


	public void setPassword(String password) {
//		String encodedPassword = bCryptPasswordEncoder.encode(password);
		this.password = password;
	}


	@Override
	public String toString() {
		return "JwtRequest [username=" + username + ", password=" + password + "]";
	}


	
	
	
	

}
