package com.chemistrylearning.service;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

@Service
public class FirebaseTokenService {

    private final String serviceAccountPath;
    private final String serviceAccountJson;

    public FirebaseTokenService(
            @Value("${firebase.service-account.path:}") String serviceAccountPath,
            @Value("${firebase.service-account.json:}") String serviceAccountJson
    ) {
        this.serviceAccountPath = serviceAccountPath;
        this.serviceAccountJson = serviceAccountJson;
    }

    public FirebaseToken verifyAuthorizationHeader(String authorizationHeader) throws FirebaseAuthException, IOException {
        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            throw new IllegalArgumentException("Missing Firebase bearer token");
        }

        String idToken = authorizationHeader.substring("Bearer ".length()).trim();
        if (idToken.isBlank()) {
            throw new IllegalArgumentException("Missing Firebase bearer token");
        }

        return getFirebaseAuth().verifyIdToken(idToken);
    }

    private FirebaseAuth getFirebaseAuth() throws IOException {
        if (FirebaseApp.getApps().isEmpty()) {
            FirebaseOptions options = FirebaseOptions.builder()
                    .setCredentials(loadCredentials())
                    .build();
            FirebaseApp.initializeApp(options);
        }

        return FirebaseAuth.getInstance();
    }

    private GoogleCredentials loadCredentials() throws IOException {
        if (!serviceAccountJson.isBlank()) {
            return GoogleCredentials.fromStream(
                    new ByteArrayInputStream(serviceAccountJson.getBytes(StandardCharsets.UTF_8))
            );
        }

        if (!serviceAccountPath.isBlank()) {
            return GoogleCredentials.fromStream(new FileInputStream(serviceAccountPath));
        }

        throw new IllegalStateException(
                "Firebase Admin credentials are not configured. Set firebase.service-account.path or firebase.service-account.json."
        );
    }
}
