package com.chemistrylearning.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class ApiControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void healthReturnsOk() throws Exception {
        mockMvc.perform(get("/api/health"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status", is("ok")))
                .andExpect(jsonPath("$.service", is("chemistry-backend")));
    }

    @Test
    void lessonsReturnsSeededLessons() throws Exception {
        mockMvc.perform(get("/api/lessons"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(3)))
                .andExpect(jsonPath("$[0].slug", is("intro")));
    }

    @Test
    void lessonReturnsSingleLessonBySlug() throws Exception {
        mockMvc.perform(get("/api/lessons/elements"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.slug", is("elements")))
                .andExpect(jsonPath("$.title", is("Important elements")));
    }

    @Test
    void lessonReturnsNotFoundForUnknownSlug() throws Exception {
        mockMvc.perform(get("/api/lessons/unknown"))
                .andExpect(status().isNotFound());
    }

    @Test
    void introQuizReturnsQuestions() throws Exception {
        mockMvc.perform(get("/api/quiz/intro"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(3)))
                .andExpect(jsonPath("$[0].question", is("What does chemistry study?")));
    }

    @Test
    void reactionCheckAcceptsCorrectReaction() throws Exception {
        mockMvc.perform(post("/api/reactions/check")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"elements\":[\"H\",\"O\"]}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.correct", is(true)))
                .andExpect(jsonPath("$.formula", is("H2O")));
    }

    @Test
    void reactionCheckRejectsInvalidPayload() throws Exception {
        mockMvc.perform(post("/api/reactions/check")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"elements\":[\"H\"]}"))
                .andExpect(status().isBadRequest());
    }

    @Test
    void reactionCheckRejectsTooManyElements() throws Exception {
        mockMvc.perform(post("/api/reactions/check")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"elements\":[\"H\",\"O\",\"Na\"]}"))
                .andExpect(status().isBadRequest());
    }

    @Test
    void reactionCheckRejectsUnknownReaction() throws Exception {
        mockMvc.perform(post("/api/reactions/check")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"elements\":[\"H\",\"Na\"]}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.correct", is(false)))
                .andExpect(jsonPath("$.message", is("Not quite. Try another pair of elements.")));
    }

    @Test
    void authMeRequiresBearerToken() throws Exception {
        mockMvc.perform(get("/api/auth/me"))
                .andExpect(status().isUnauthorized());
    }
}
