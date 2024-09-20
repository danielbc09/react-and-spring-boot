package com.backend.usersapp.models.dto.mapper;

import com.backend.usersapp.models.dto.UserDto;
import com.backend.usersapp.models.entities.User;

public class DtoMapperUser {

  private User user;

  private DtoMapperUser() {}

  public static DtoMapperUser builder() {
    return new DtoMapperUser();
  }

  public DtoMapperUser setUser(User user) {
    this.user = user;
    return this;
  }

  public UserDto build() {
    if (user == null) {
      throw new RuntimeException("Debe pasar el entity user");
    }
    boolean isAdmin =
        user.getRoles().stream().anyMatch(role -> "ROLE_ADMIN".equals(role.getName()));
    return new UserDto(this.user.getId(), user.getUsername(), user.getEmail(), isAdmin);
  }
}
