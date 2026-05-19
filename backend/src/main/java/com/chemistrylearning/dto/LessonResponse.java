package com.chemistrylearning.dto;

import java.util.List;

public record LessonResponse(
        String slug,
        String title,
        List<String> paragraphs
) {
}
