package com.backend.usersapp.models.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserRequest {
  @NotBlank
  @Size(min = 4, max = 10)
  private String username;

  @NotEmpty @Email private String email;
  private boolean admin;
}
