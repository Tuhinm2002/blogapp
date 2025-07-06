package com.BlogApp.BlogApp.controller;

import com.BlogApp.BlogApp.models.Roles;
import com.BlogApp.BlogApp.models.User;
import com.BlogApp.BlogApp.repository.RoleRepo;
import com.BlogApp.BlogApp.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;

@RestController
@RequestMapping("/api")
public class AuthController {


    private final AuthenticationManager authenticationManager;
    private final UserRepo userRepo;
    private final RoleRepo roleRepo;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AuthController(AuthenticationManager authenticationManager,
                          UserRepo userRepo,RoleRepo roleRepo,
                          PasswordEncoder passwordEncoder)
    {
        this.authenticationManager = authenticationManager;
        this.userRepo = userRepo;
        this.roleRepo  = roleRepo;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User request){
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getUsername(),request.getPassword()
                    )
            );

            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            return ResponseEntity.ok("Login successful");
        }
        catch (BadCredentialsException e){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                    "Invalid credentials"
            );
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User request){
        if(userRepo.findByUsername(request.getUsername()) != null){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User already Exists");
        }

        Roles userRole = roleRepo.findByName("USER");
        if(userRole == null){
            userRole = new Roles();
            userRole.setName("USER");
            roleRepo.save(userRole);
        }

        User newUser = new User();
        newUser.setUsername(request.getUsername());
        newUser.setPassword(passwordEncoder.encode(request.getPassword()));
        newUser.setRoles(Set.of(userRole));

        userRepo.save(newUser);
        return ResponseEntity.status(HttpStatus.CREATED).body("User registered");
    }


}
