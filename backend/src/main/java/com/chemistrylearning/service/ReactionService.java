package com.chemistrylearning.service;

import com.chemistrylearning.dto.ReactionCheckResponse;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ReactionService {

    private static final Map<String, ReactionCheckResponse> CORRECT_REACTIONS = Map.of(
            reactionKey(List.of("H", "O")),
            new ReactionCheckResponse(true, "H2O", "H<sub>2</sub>O", "Correct! You made water."),
            reactionKey(List.of("C", "O")),
            new ReactionCheckResponse(true, "CO2", "CO<sub>2</sub>", "Correct! You made carbon dioxide."),
            reactionKey(List.of("Na", "Cl")),
            new ReactionCheckResponse(true, "NaCl", "NaCl", "Correct! You made table salt.")
    );

    public ReactionCheckResponse check(List<String> elements) {
        String key = reactionKey(elements);
        ReactionCheckResponse reaction = CORRECT_REACTIONS.get(key);

        if (reaction != null) {
            return reaction;
        }

        return new ReactionCheckResponse(false, null, null, "Not quite. Try another pair of elements.");
    }

    private static String reactionKey(List<String> elements) {
        return elements.stream()
                .map(String::trim)
                .sorted(Comparator.naturalOrder())
                .collect(Collectors.joining("+"));
    }
}
