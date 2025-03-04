package com.example.controller;

import com.example.dto.JWTResponse;
import com.example.dto.LoginDto;
import com.example.dto.RegisterDto;
import com.example.dto.RegisterResponse;
import com.example.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/v1/auth")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping(value = {"/login"})
    public ResponseEntity<JWTResponse> login(@Valid @RequestBody LoginDto loginDto) {
        String token = authService.login(loginDto);
        JWTResponse jwtAuthResponse = new JWTResponse();
        jwtAuthResponse.setAccessToken(token);

        return ResponseEntity.ok(jwtAuthResponse);
    }

    @PostMapping("/register")
    public ResponseEntity<RegisterResponse> register(@Valid @RequestBody RegisterDto registerDto) {
        String response = authService.register(registerDto);

        return new ResponseEntity<>(new RegisterResponse(response), HttpStatus.OK);
    }
}

