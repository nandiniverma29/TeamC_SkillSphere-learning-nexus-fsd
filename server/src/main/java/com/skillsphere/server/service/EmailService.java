package com.skillsphere.server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Value("${app.frontend-url}")
    private String frontendUrl;

    public void sendPasswordResetEmail(String toEmail, String token) {
        String resetLink = frontendUrl + "/reset-password?token=" + token;

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("Reset your SkillSphere password");
        message.setText(
                "We received a request to reset your SkillSphere password.\n\n" +
                        "Click the link below to set a new password. This link expires in 30 minutes:\n\n" +
                        resetLink + "\n\n" +
                        "If you didn't request this, you can safely ignore this email."
        );

        mailSender.send(message);
    }
}