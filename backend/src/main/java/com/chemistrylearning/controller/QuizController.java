package com.chemistrylearning.controller;

import com.chemistrylearning.dto.QuizQuestionResponse;
import com.chemistrylearning.service.ChemistryContentService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/quiz")
public class QuizController {

    private final ChemistryContentService contentService;

    public QuizController(ChemistryContentService contentService) {
        this.contentService = contentService;
    }

    @GetMapping("/intro")
    public List<QuizQuestionResponse> introQuiz() {
        return contentService.getIntroQuiz();
    }
}
