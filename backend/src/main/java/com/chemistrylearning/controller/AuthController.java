package com.chemistrylearning.controller;

import com.chemistrylearning.dto.UserProfileResponse;
import com.chemistrylearning.service.FirebaseTokenService;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final FirebaseTokenService firebaseTokenService;

    public AuthController(FirebaseTokenService firebaseTokenService) {
        this.firebaseTokenService = firebaseTokenService;
    }

    @GetMapping("/me")
    public UserProfileResponse me(@RequestHeader(value = "Authorization", required = false) String authorization) {
        try {
            FirebaseToken token = firebaseTokenService.verifyAuthorizationHeader(authorization);
            return new UserProfileResponse(token.getUid(), token.getEmail(), token.getName());
        } catch (IllegalStateException error) {
            throw new ResponseStatusException(HttpStatus.SERVICE_UNAVAILABLE, error.getMessage(), error);
        } catch (FirebaseAuthException | IOException | IllegalArgumentException error) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, error.getMessage(), error);
        }
    }
}
