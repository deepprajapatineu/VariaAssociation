package com.jwt.config;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.jwt.helper.JwtUtil;
import com.jwt.services.CustomUserDetailsService;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

//	@Autowired
//	private BCryptPasswordEncoder passwordEncoder;
	
	@Autowired
	private CustomUserDetailsService customUserDetailService;
	
	@Autowired
	private JwtUtil jwtUtil;
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		
		String requestTokenHeader = request.getHeader("Authorization");
		String mobileNumber=null;
		String username=null;
		String jwtToken=null;
		if(requestTokenHeader!=null && requestTokenHeader.startsWith("Bearer ")){
				
			jwtToken=requestTokenHeader.substring(7);
			try {
//				mobileNumber= this.jwtUtil.extractMobileNumber(jwtToken);
				username= this.jwtUtil.extractUsername(jwtToken);
			}
			catch(Exception e) {
				e.printStackTrace();
			}
			
//			UserDetails userDetails = this.customUserDetailService.loadUserByMobileNumber(mobileNumber);
			UserDetails userDetails = this.customUserDetailService.loadUserByUsername(username);
	
//			//Security
//			if(mobileNumber!=null && SecurityContextHolder.getContext().getAuthentication()==null) {
//				
//				UsernamePasswordAuthenticationToken mobileNumbePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());
//				mobileNumbePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
//				SecurityContextHolder.getContext().setAuthentication(mobileNumbePasswordAuthenticationToken);
//				
//			}else
//			{
//				System.out.println("Token is not Validate...");
//			}
			
			//Security
			if(username!=null && SecurityContextHolder.getContext().getAuthentication()==null) {
				
				UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());
				usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
				SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
				
			}else
			{
				System.out.println("Token is not Validate...");
			}
			
			
			
		}
		filterChain.doFilter(request, response);
		
	}

}
