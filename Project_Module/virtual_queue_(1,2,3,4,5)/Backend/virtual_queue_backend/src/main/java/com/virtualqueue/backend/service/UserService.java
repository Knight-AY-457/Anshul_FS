package com.virtualqueue.backend.service;

import com.virtualqueue.backend.model.User;
import com.virtualqueue.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository repo;

    public UserService(UserRepository repo) {
        this.repo = repo;
    }

    //  Register user (shop creation now done only in controller)
    public User register(User user) {
        return repo.save(user);
    }

    public List<User> getAllUsers() {
        return repo.findAll();
    }

    public Optional<User> getUserByEmail(String email) {
        return repo.findByEmail(email);
    }
}
