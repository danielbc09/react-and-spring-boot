package com.backend.usersapp.repositories;

import com.backend.usersapp.models.entities.Role;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface RoleRepository extends CrudRepository<Role, Long> {

  Optional<Role> findByName(String name);
}
