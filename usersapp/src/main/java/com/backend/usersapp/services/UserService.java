package com.backend.usersapp.services;

import com.backend.usersapp.models.dto.UserDto;
import com.backend.usersapp.models.request.UserRequest;
import com.backend.usersapp.models.entities.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
  List<UserDto> findAll();

  Optional<UserDto> findById(long id);

  UserDto save(User user);

  Optional<UserDto> update(UserRequest user, long id);

  void remove(Long id);
}
