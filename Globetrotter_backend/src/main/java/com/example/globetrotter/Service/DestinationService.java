package com.example.globetrotter.Service;

import com.example.globetrotter.Entity.Destination;
import com.example.globetrotter.Repository.DestinationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class DestinationService {
    @Autowired
    private DestinationRepository repository;

    public Destination getRandomDestination() {
        return repository.getRandomDestination();
    }

    public boolean checkAnswer(Long id, String answer) {
        Destination destination = repository.findById(id).orElse(null);
        return destination != null && destination.getCorrectAnswer().equalsIgnoreCase(answer);
    }
    public List<String[]> getOptions(long id) {
        Destination destination = repository.findById(id).orElse(null);
        List<String> options = destination.getOptions();
        List<String[]> pairs = new ArrayList<>();

        for(int i=0;i<options.size();i++) {
            pairs.add(new String[]{String.valueOf(i),options.get(i)});
        }
        return pairs;
    }
}
