package com.patientRegister.patientRegister.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
@Configuration
@EnableWebSecurity
public class SpringSecurityConfig {
  private final UserDetailsService customUserDetailsService;
  
  public SpringSecurityConfig(UserDetailsService customUserDetailsService){
    this.customUserDetailsService = customUserDetailsService;
  }

  @Bean
  public PasswordEncoder passwordEncoder(){
    return new BCryptPasswordEncoder();
  }

  @Bean
public UserDetailsService userDetailsService() {
    return customUserDetailsService; 
}

  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{

    http
        .authorizeHttpRequests((auth)-> auth
        .requestMatchers("/login", "/home").permitAll().anyRequest().authenticated())
        .formLogin(
            form -> form
            .loginPage("/login")
            .defaultSuccessUrl("/welcome", true)
            .permitAll()
        )
        .logout(logout -> logout
        .logoutSuccessUrl("/login")
        .permitAll());

        return http.build();
  }

}
