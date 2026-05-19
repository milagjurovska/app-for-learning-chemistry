package com.chemistrylearning.service;

import com.chemistrylearning.dto.LessonResponse;
import com.chemistrylearning.dto.QuizQuestionResponse;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class ChemistryContentService {

    private final List<LessonResponse> lessons = List.of(
            new LessonResponse("intro", "What is chemistry?", List.of(
                    "Chemistry studies matter and how it changes.",
                    "Atoms are tiny building blocks that can join together to make molecules."
            )),
            new LessonResponse("elements", "Important elements", List.of(
                    "Hydrogen, carbon, nitrogen, oxygen, fluorine and chlorine are useful elements to know.",
                    "The periodic table organizes all known elements by their properties."
            )),
            new LessonResponse("reactions", "Chemical reactions", List.of(
                    "Chemical equations show which substances react and which products are formed.",
                    "Water, carbon dioxide and table salt are familiar examples of compounds."
            ))
    );

    private final List<QuizQuestionResponse> introQuiz = List.of(
            new QuizQuestionResponse("What does chemistry study?", List.of(
                    "Interactions between objects, forces and energy.",
                    "Places.",
                    "The property of matter.",
                    "Living things."
            ), 2),
            new QuizQuestionResponse("What is matter made up of?", List.of(
                    "Building blocks.",
                    "Atoms.",
                    "Air.",
                    "Water."
            ), 1),
            new QuizQuestionResponse("What is a covalent bond?", List.of(
                    "Found in metals.",
                    "Friendship between atoms.",
                    "Formed when two atoms share electrons.",
                    "Formed when one atom donates an electron to another."
            ), 2)
    );

    public List<LessonResponse> getLessons() {
        return lessons;
    }

    public LessonResponse getLesson(String slug) {
        return lessons.stream()
                .filter(lesson -> lesson.slug().equalsIgnoreCase(slug))
                .findFirst()
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Lesson not found"));
    }

    public List<QuizQuestionResponse> getIntroQuiz() {
        return introQuiz;
    }
}
