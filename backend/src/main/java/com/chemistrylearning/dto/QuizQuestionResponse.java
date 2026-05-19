package com.chemistrylearning.dto;

import java.util.List;

public record QuizQuestionResponse(
        String question,
        List<String> options,
        int answerIndex
) {
}
