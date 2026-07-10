package com.skillsphere.server.controller;

import com.skillsphere.server.dto.AuthRequest;
import com.skillsphere.server.model.User;
import com.skillsphere.server.repository.UserRepository;
import com.skillsphere.server.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody AuthRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Email already registered"));
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        userRepository.save(user);

        String token = jwtUtil.generateToken(user.getEmail());
        return ResponseEntity.ok(Map.of("token", token));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        Optional<User> userOpt = userRepository.findByEmail(request.getEmail());

        if (userOpt.isEmpty()) {
            return ResponseEntity.status(401).body(Map.of("error", "Invalid email or password"));
        }

        User user = userOpt.get();

        if (user.getPassword() == null) {
            return ResponseEntity.status(401).body(Map.of("error", "This account uses Google sign-in. Please use 'Continue with Google'."));
        }

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return ResponseEntity.status(401).body(Map.of("error", "Invalid email or password"));
        }

        String token = jwtUtil.generateToken(user.getEmail());
        return ResponseEntity.ok(Map.of("token", token));
    }
}