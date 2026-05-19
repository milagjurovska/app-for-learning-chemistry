package com.chemistrylearning.service;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThatThrownBy;

class FirebaseTokenServiceTest {

    private final FirebaseTokenService firebaseTokenService = new FirebaseTokenService("", "");

    @Test
    void rejectsMissingAuthorizationHeader() {
        assertThatThrownBy(() -> firebaseTokenService.verifyAuthorizationHeader(null))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessageContaining("Missing Firebase bearer token");
    }

    @Test
    void rejectsAuthorizationHeaderWithoutBearerPrefix() {
        assertThatThrownBy(() -> firebaseTokenService.verifyAuthorizationHeader("Token abc"))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessageContaining("Missing Firebase bearer token");
    }

    @Test
    void rejectsBlankBearerToken() {
        assertThatThrownBy(() -> firebaseTokenService.verifyAuthorizationHeader("Bearer   "))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessageContaining("Missing Firebase bearer token");
    }
}
