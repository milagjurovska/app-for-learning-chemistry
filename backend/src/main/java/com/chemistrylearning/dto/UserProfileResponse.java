package com.chemistrylearning.dto;

public record UserProfileResponse(
        String uid,
        String email,
        String displayName
) {
}
