package com.chemistrylearning.controller;

import com.chemistrylearning.dto.LessonResponse;
import com.chemistrylearning.service.ChemistryContentService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/lessons")
public class LessonController {

    private final ChemistryContentService contentService;

    public LessonController(ChemistryContentService contentService) {
        this.contentService = contentService;
    }

    @GetMapping
    public List<LessonResponse> lessons() {
        return contentService.getLessons();
    }

    @GetMapping("/{slug}")
    public LessonResponse lesson(@PathVariable String slug) {
        return contentService.getLesson(slug);
    }
}
