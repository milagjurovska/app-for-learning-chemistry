package com.chemistrylearning.controller;

import com.chemistrylearning.dto.ReactionCheckRequest;
import com.chemistrylearning.dto.ReactionCheckResponse;
import com.chemistrylearning.service.ReactionService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/reactions")
public class ReactionController {

    private final ReactionService reactionService;

    public ReactionController(ReactionService reactionService) {
        this.reactionService = reactionService;
    }

    @PostMapping("/check")
    public ReactionCheckResponse check(@Valid @RequestBody ReactionCheckRequest request) {
        return reactionService.check(request.elements());
    }
}
