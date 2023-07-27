package com.jwt;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.jwt.model.User;
import com.jwt.repo.UserRepository;

@SpringBootApplication
public class JwtauthenticationserverApplication implements CommandLineRunner {

	
	@Autowired
	private UserRepository userRepository;
	Random random = new Random();
	
	public void createUsers() {
		
		User user = new User();
//		Long uid = new Long(random.nextInt(100));
//		user.setUid(uid);
//		user.setFirstName("Deep");
//		user.setMiddleName("Prajeshbhai");
//		user.setLastName("Prajapati");
//		user.setMobileNumber("9824629886");
//		user.setUsername("deepprajapati");
//		user.setPassword("deep123");
//		user.setVillage("Gada");
//		user.setRole("user");
//		user.setEnable(true);
		
//		User save = userRepository.save(user);
		
//		System.out.println(save);
	}
	
	public static void main(String[] args) {
		SpringApplication.run(JwtauthenticationserverApplication.class, args);
		
//		new JwtauthenticationserverApplication().createUsers();
	}

	@Override
	public void run(String... args) throws Exception {
		// TODO Auto-generated method stub
		createUsers();
	}

}
