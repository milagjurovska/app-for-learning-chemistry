package com.chemistrylearning.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

import java.util.List;

public record ReactionCheckRequest(
        @NotEmpty
        @Size(min = 2, max = 2)
        List<String> elements
) {
}
