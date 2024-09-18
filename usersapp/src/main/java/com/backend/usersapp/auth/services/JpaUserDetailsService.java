package com.backend.usersapp.auth.services;

import com.backend.usersapp.repositories.UserRepository;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static java.lang.String.*;

@Service
public class JpaUserDetailsService implements UserDetailsService {

  UserRepository userRepository;

  public JpaUserDetailsService(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  @Override
  @Transactional(readOnly = true)
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    Optional<com.backend.usersapp.models.entities.User> userOptional =
        userRepository.findByUsername(username);
    if (userOptional.isEmpty()) {
      throw new UsernameNotFoundException(format("Usuario % no existe en el sistema!", username));
    }
    com.backend.usersapp.models.entities.User user = userOptional.orElseThrow();

    List<GrantedAuthority> authorities =
        user.getRoles().stream()
            .map(role -> new SimpleGrantedAuthority(role.getName()))
            .collect(Collectors.toList());

    return new User(user.getUsername(), user.getPassword(), true, true, true, true, authorities);
  }
}
