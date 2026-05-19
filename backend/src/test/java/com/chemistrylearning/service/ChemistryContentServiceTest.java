package com.chemistrylearning.service;

import com.chemistrylearning.dto.LessonResponse;
import org.junit.jupiter.api.Test;
import org.springframework.web.server.ResponseStatusException;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class ChemistryContentServiceTest {

    private final ChemistryContentService contentService = new ChemistryContentService();

    @Test
    void getsLessonBySlugCaseInsensitively() {
        LessonResponse lesson = contentService.getLesson("ELEMENTS");

        assertThat(lesson.slug()).isEqualTo("elements");
        assertThat(lesson.paragraphs()).isNotEmpty();
    }

    @Test
    void throwsWhenLessonDoesNotExist() {
        assertThatThrownBy(() -> contentService.getLesson("missing"))
                .isInstanceOf(ResponseStatusException.class)
                .hasMessageContaining("Lesson not found");
    }
}
