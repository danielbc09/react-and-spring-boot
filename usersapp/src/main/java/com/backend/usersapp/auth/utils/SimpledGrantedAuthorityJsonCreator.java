package com.backend.usersapp.auth.utils;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public abstract class SimpledGrantedAuthorityJsonCreator {

  @JsonCreator
  public SimpledGrantedAuthorityJsonCreator(@JsonProperty("authority") String role) {}
}
