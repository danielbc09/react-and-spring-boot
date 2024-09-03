package com.backend.usersapp.services;

import com.backend.usersapp.models.entities.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    List<User> findAll();
    Optional<User> findById(long id);
    User save(User user);
    Optional<User> update(User user, long id);
    void remove(Long id);
}
