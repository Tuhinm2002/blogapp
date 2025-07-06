package com.BlogApp.BlogApp.config;

import com.BlogApp.BlogApp.services.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;


@Configuration
public class BlogSecurityConfig{

    private final UserDetailsServiceImpl udsImpl;

    @Autowired
    public BlogSecurityConfig(UserDetailsServiceImpl udsImpl){
        this.udsImpl = udsImpl;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
        return http.csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth ->
                        auth.requestMatchers("/api/login","/api/register","/blogs/**","/add").permitAll()
                                .anyRequest().authenticated())
                .formLogin(form -> form.loginPage("/api/login"))
                .logout(logout->logout.logoutSuccessUrl("/logout"))
                .userDetailsService(udsImpl)
                .build();
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config)throws Exception{
        return config.getAuthenticationManager();
    }

}
