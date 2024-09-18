package com.backend.usersapp.models.entities;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Table(name = "roles")
@Getter
public class Role {

  public Role() {
    this.name = name;
  }

  public Role(Long id, String name) {
    this.name = name;
  }

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(unique = true)
  private String name;
}
