package com.backend.usersapp.services;

import com.backend.usersapp.models.dto.UserDto;
import com.backend.usersapp.models.dto.mapper.DtoMapperUser;
import com.backend.usersapp.models.entities.Role;
import com.backend.usersapp.models.entities.User;
import com.backend.usersapp.models.request.UserRequest;
import com.backend.usersapp.repositories.RoleRepository;
import com.backend.usersapp.repositories.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {
  UserRepository userRepository;
  PasswordEncoder passwordEncoder;
  RoleRepository roleRepository;

  public UserServiceImpl(
      UserRepository userRepository,
      PasswordEncoder passwordEncoder,
      RoleRepository roleRepository) {
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
    this.roleRepository = roleRepository;
  }

  @Override
  @Transactional(readOnly = true)
  public List<UserDto> findAll() {
    List<User> users = (List<User>) userRepository.findAll();

    return users.stream()
        .map(user -> DtoMapperUser.builder().setUser(user).build())
        .collect(Collectors.toList());
  }

  @Override
  @Transactional(readOnly = true)
  public Optional<UserDto> findById(long id) {
    return userRepository.findById(id).map(user -> DtoMapperUser.builder().setUser(user).build());
  }

  @Override
  @Transactional()
  public UserDto save(User user) {
    user.setPassword(passwordEncoder.encode(user.getPassword()));
    user.setRoles(getRoles(user.isAdmin()));
    return DtoMapperUser.builder().setUser(userRepository.save(user)).build();
  }

  @Override
  @Transactional
  public Optional<UserDto> update(UserRequest user, long id) {
    Optional<User> userSaved = userRepository.findById(id);
    User userOptional = null;
    if (userSaved.isPresent()) {
      User userDb = userSaved.orElseThrow();
      userDb.setRoles(getRoles(user.isAdmin()));
      userDb.setUsername(user.getUsername());
      userDb.setEmail(user.getEmail());
      userOptional = userRepository.save(userDb);
    }
    return Optional.ofNullable(DtoMapperUser.builder().setUser(userOptional).build());
  }

  private List<Role> getRoles(boolean user) {
    List<Role> roles = new ArrayList<>();
    Optional<Role> roleUserOptional = roleRepository.findByName("ROLE_USER");
    if (roleUserOptional.isPresent()) {
      roles.add(roleUserOptional.orElseThrow());
    }
    if (user) {
      Optional<Role> roleAdminOptional = roleRepository.findByName("ROLE_ADMIN");
      if (roleAdminOptional.isPresent()) {
        roles.add(roleAdminOptional.orElseThrow());
      }
    }
    return roles;
  }

  @Override
  @Transactional()
  public void remove(Long id) {
    userRepository.deleteById(id);
  }
}
