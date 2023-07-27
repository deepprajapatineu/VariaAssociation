package com.jwt.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

//import com.api.book.bootrestboook.entities.Book;
import com.jwt.helper.JwtUtil;
import com.jwt.model.JwtRequest;
import com.jwt.model.JwtResponse;
import com.jwt.model.User;
import com.jwt.repo.UserRepository;
import com.jwt.services.CustomUserDetailsService;

@Service
@RestController
@CrossOrigin(origins = "*")
public class JwtController {
	
//	@Autowired
//	private PasswordEncoder passwordEncoder;
	
//	@Autowired
//	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private CustomUserDetailsService customUserDetailService;
	
	@Autowired
	private JwtUtil jwtUtil;
	
	@RequestMapping(value = "/token",method = RequestMethod.POST)
	public ResponseEntity<?> generateToken(@RequestBody JwtRequest jwtRequest) throws Exception
	{
		System.out.println(jwtRequest);
//		return null;
		try {
			
//			this.authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(jwtRequest.getMobileNumber(),jwtRequest.getPassword()));
			this.authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(jwtRequest.getUsername(),jwtRequest.getPassword()));
		}
		catch(UsernameNotFoundException e)
		{
			e.printStackTrace();
			throw new Exception("Bad Credentials");
		}catch (BadCredentialsException e)
		{
			e.printStackTrace();
			throw new Exception("Bad Credentials");
		}
		
//		UserDetails userDetails = this.customUserDetailService.loadUserByMobileNumber(jwtRequest.getMobileNumber());
		UserDetails userDetails = this.customUserDetailService.loadUserByUsername(jwtRequest.getUsername());
		
		String token = this.jwtUtil.generateToken(userDetails);
		System.out.println("JWT: "+token);
		
		return ResponseEntity.ok(new JwtResponse(token));
		
	}
	
	@PostMapping("/usersave")
	public String insertUser(@RequestBody User user) {
//		user.setPassword(passwordEncoder.encode(user.getPassword()));
		
		userRepository.save(user);
//		return "Deep Your Record is saved successfully!!!";
		return ("{\"status\": \"successful\"}");
		
	}
	
	@PostMapping("/multipleusersave")
	public String insertUser(@RequestBody List<User> user) {
		userRepository.saveAll(user);
		return "Your Record is saved successfully!!!";
		
	}
	
	@GetMapping("/getalluser")
	public List<User> getUser(){
		return (List<User>) userRepository.findAll();
		
	}
	
//	@GetMapping("/getmyuser/{mobileNumber}")
//	public User getMyUser(@PathVariable("mobileNumber") String mobileNumber){
//		return  userRepository.findByUsername(mobileNumber);
//		
//	}
	
	@GetMapping("/getmyuser/{name}")
	public User getMyUser(@PathVariable("name") String username){
		return  userRepository.findByUsername(username);
		
	}

	
//	@GetMapping("/users")
//	public ResponseEntity<List<User>> getBooks(){
//		List<User> list = userRepository.getAllUsers();
//		if(list.size() <= 0) {
//			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
//		}
//		return ResponseEntity.of(Optional.of(list));
//		return this.bookService.getAllBooks();
		
	}

//}

 
