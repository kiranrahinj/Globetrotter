package com.example.globetrotter.Controller;

import com.example.globetrotter.Entity.Destination;
import com.example.globetrotter.Service.DestinationService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/destination")
@CrossOrigin(origins = "http://localhost:5173")
public class DestinationController {
    @Autowired
    private DestinationService service;

    @GetMapping("/random")
    public Destination getRandomDestination() {
        return service.getRandomDestination();
    }

    @PostMapping("/answer")
    public Map<String, String> checkAnswer(@RequestParam Long id, @RequestParam String answer) {
        boolean correct = service.checkAnswer(id, answer);
        return Map.of("result", correct ? "Correct!" : "Wrong!");
    }

    @GetMapping("/options/{id}")
    public List<String[]> getOptions(@PathVariable String id) {
        return service.getOptions(Long.parseLong(id));
    }
}

