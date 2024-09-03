package com.backend.usersapp.services;

import com.backend.usersapp.models.entities.User;
import com.backend.usersapp.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
@Service
public class UserServiceImpl implements UserService{
    @Autowired
    private UserRepository userRepository;
    @Override
    @Transactional(readOnly = true)
    public List<User> findAll() {
        return (List<User>) userRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<User> findById(long id) {
        return userRepository.findById(id);
    }
    @Override
    @Transactional()
    public User save(User user) {
        return userRepository.save(user);
    }

    @Override
    @Transactional
    public Optional<User> update(User user, long id) {
        Optional<User> userSaved = findById(id);
        if (userSaved.isPresent()) {
            User userDb = userSaved.orElseThrow();
            userDb.setUsername(user.getUsername());
            userDb.setEmail(user.getEmail());
            return Optional.of(save(userDb));
        }
        return Optional.empty();
    }

    @Override
    @Transactional()
    public void remove(Long id) {
        userRepository.deleteById(id);
    }
}
