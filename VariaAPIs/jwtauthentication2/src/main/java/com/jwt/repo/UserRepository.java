package com.jwt.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jwt.model.User;

public interface UserRepository extends JpaRepository<User,Long> {

	public User findByUsername(String username);
	public User findByMobileNumber(String mobileNumber);
//	public List<User> findByUsername(String username);
	
//	public List<User> findByUserName(String username);

//	public List<User> getAllUsers();
}

