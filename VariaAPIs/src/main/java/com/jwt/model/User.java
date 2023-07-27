package com.jwt.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="USER")
public class User {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO )
	private Long uid;
	private String username;
	private String password;
	private String firstName;
	private String middleName;
	private String lastName;
	private String countryCode;
	private String mobileNumber;
	private String village;
	private String role;
	
	private boolean enable;
	
	public User() {}


	public User(Long uid, String username, String password, String firstName, String middleName, String lastName,String countryCode,
			String mobileNumber, String village,String role, boolean enable) {
//		super();
		this.uid = uid;
		this.username = username;
		this.password = password;
		this.firstName = firstName;
		this.middleName = middleName;
		this.lastName = lastName;
		this.countryCode= countryCode;
		this.mobileNumber = mobileNumber;
		this.village = village;
		this.enable=enable;
		this.role=role;
	}

	//getter setter

	public Long getUid() {
		return uid;
	}


	public void setUid(Long uid) {
		this.uid = uid;
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
		this.password = password;
	}


	public String getFirstName() {
		return firstName;
	}


	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}


	public String getMiddleName() {
		return middleName;
	}


	public void setMiddleName(String middleName) {
		this.middleName = middleName;
	}


	public String getLastName() {
		return lastName;
	}


	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	
	public String getCountryCode() {
		return countryCode;
	}


	public void setCountryCode(String countryCode) {
		this.countryCode = countryCode;
	}


	public String getMobileNumber() {
		return mobileNumber;
	}


	public void setMobileNumber(String mobileNumber) {
		this.mobileNumber = mobileNumber;
	}


	public String getVillage() {
		return village;
	}


	public void setVillage(String village) {
		this.village = village;
	}
	
	public String getRole() {
		return role;
	}


	public void setRole(String role) {
		this.role = role;
	}
	
	public Boolean getEnable() {
		return enable;
	}


	public void setEnable(boolean enable) {
		this.enable = enable;
	}






	//to string method

	@Override
	public String toString() {
		return "User [uid=" + uid + ", username=" + username + ", password=" + password + ", firstName=" + firstName
				+ ", middleName=" + middleName + ", lastName=" + lastName + ",countryCode=" + countryCode + ", mobileNumber=" + mobileNumber
				+ ", village=" + village + ", role=" + role + ", enable=" + enable + "]";
	}


	
	
	
	

}
