package com.chemistrylearning.service;

import com.chemistrylearning.dto.ReactionCheckResponse;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

class ReactionServiceTest {

    private final ReactionService reactionService = new ReactionService();

    @Test
    void acceptsCorrectReactionInEitherOrder() {
        ReactionCheckResponse response = reactionService.check(List.of("Cl", "Na"));

        assertThat(response.correct()).isTrue();
        assertThat(response.formula()).isEqualTo("NaCl");
    }

    @Test
    void rejectsUnknownReaction() {
        ReactionCheckResponse response = reactionService.check(List.of("H", "Na"));

        assertThat(response.correct()).isFalse();
        assertThat(response.formula()).isNull();
    }

    @Test
    void trimsElementsBeforeCheckingReaction() {
        ReactionCheckResponse response = reactionService.check(List.of(" Na ", "Cl"));

        assertThat(response.correct()).isTrue();
        assertThat(response.formula()).isEqualTo("NaCl");
    }

    @Test
    void returnsCarbonDioxideHtmlFormula() {
        ReactionCheckResponse response = reactionService.check(List.of("O", "C"));

        assertThat(response.correct()).isTrue();
        assertThat(response.formula()).isEqualTo("CO2");
        assertThat(response.formulaHtml()).isEqualTo("CO<sub>2</sub>");
    }
}
