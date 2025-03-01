package com.example.globetrotter.Controller;

import com.example.globetrotter.DTO.ScoreRequest;
import com.example.globetrotter.DTO.ScoreResponse;
import com.example.globetrotter.Entity.User;
import com.example.globetrotter.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {
    @Autowired
    private UserService service;

    @GetMapping("/getUser/{id}")
    public User getUser(@PathVariable Long id) {
        return service.getUser(id).get();
    }

    @GetMapping("/getAll")
    public List<User> getAllUsers() {
        return service.getAllUsers();
    }
    @PostMapping("/register")
    public ScoreResponse registerUser(@RequestParam String username) {
        return service.registerUser(username);
    }

    @PutMapping("/score")
    public ScoreResponse updateScore(@RequestBody ScoreRequest scoreRequest) {
        return service.updateUserScore(scoreRequest);
    }
}
