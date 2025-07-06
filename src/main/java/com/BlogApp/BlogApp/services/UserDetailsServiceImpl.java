package com.BlogApp.BlogApp.services;

import com.BlogApp.BlogApp.models.User;
import com.BlogApp.BlogApp.repository.UserRepo;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    private UserRepo userRepo;

    public UserDetailsServiceImpl(UserRepo userRepo){
        this.userRepo = userRepo;
    }

    @Override
    public UserDetails loadUserByUsername (String username) throws UsernameNotFoundException{
        User user = userRepo.findByUsername(username);

        if (user == null) throw new UsernameNotFoundException("user not found");

        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(),
                user.getRoles().stream()
                .map(roles -> new SimpleGrantedAuthority(roles.getName()))
                        .collect(Collectors.toList())
        );
    }
}
