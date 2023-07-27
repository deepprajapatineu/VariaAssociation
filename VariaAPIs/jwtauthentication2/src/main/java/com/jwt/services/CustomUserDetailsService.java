package com.jwt.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

//import com.api.book.bootrestboook.entities.Book;
import com.jwt.model.CustomUserDetails;
import com.jwt.model.User;
import com.jwt.repo.UserRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {

	@Autowired
	private UserRepository userRepository;
	
//	public UserDetails loadUserByMobileNumber(String mobileNumber)  {
//
//
//		final User user = this.userRepository.findByUsername(mobileNumber);
//	
//		if(user==null){
//			throw new UsernameNotFoundException("User not found!");
//		}else
//		{
//			return new CustomUserDetails(user);
//		}
//		
//			}
//
//	@Override
//	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//		// TODO Auto-generated method stub
//		return null;
//	}
	
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {


//		String username;
		final User user = this.userRepository.findByUsername(username);
	
		if(user==null){
			throw new UsernameNotFoundException("User not found!");
		}else
		{
			return new CustomUserDetails(user);
		}
		
		
		
//		if (userName.equals("deep")) {
//			return new User("deep","deep123", new ArrayList<>());
//		}else {
//			throw new UsernameNotFoundException("User Not Found!!!");
//		}
	}
	


}
