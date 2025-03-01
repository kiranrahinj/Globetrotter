package com.example.globetrotter.Service;

import com.example.globetrotter.DTO.ScoreRequest;
import com.example.globetrotter.DTO.ScoreResponse;
import com.example.globetrotter.Entity.User;
import com.example.globetrotter.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository repository;
    @Autowired
    private UserRepository userRepository;

    public ScoreResponse registerUser(String username) {
        User user = new User();
        user.setUsername(username);
        user.setScore(0);
        userRepository.save(user);

        ScoreResponse scoreResponse = new ScoreResponse();
        scoreResponse.setUsername(username);
        scoreResponse.setScore(0);
        return scoreResponse;
    }
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    public Optional<User> getUser(Long id) {
        return repository.findById(id);
    }

    public ScoreResponse updateUserScore(ScoreRequest scoreRequest) {
        ScoreResponse scoreResponse = new ScoreResponse();

        Optional<User> user = repository.findByUsername(scoreRequest.getUserId());
        if (user.isPresent()) {
            User u = user.get();
            if (scoreRequest.getIsCorrect()) {
                u.setScore(u.getScore() + 10);
            }
            repository.save(u);
            scoreResponse.setScore(u.getScore());
            scoreResponse.setUsername(u.getUsername());
            return scoreResponse;
        }
        return scoreResponse;
    }
}
