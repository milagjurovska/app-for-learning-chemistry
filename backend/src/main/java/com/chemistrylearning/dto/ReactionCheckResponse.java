package com.chemistrylearning.dto;

public record ReactionCheckResponse(
        boolean correct,
        String formula,
        String formulaHtml,
        String message
) {
}
