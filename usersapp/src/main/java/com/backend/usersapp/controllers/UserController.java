package com.backend.usersapp.controllers;

import com.backend.usersapp.models.dto.UserDto;
import com.backend.usersapp.models.request.UserRequest;
import com.backend.usersapp.models.entities.User;
import com.backend.usersapp.services.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/users")
@CrossOrigin(originPatterns = "*")
public class UserController {

  UserService userService;
  @Autowired
  public UserController(UserService userService) {
    this.userService = userService;
  }
  @GetMapping
  public List<UserDto> list() {
    return userService.findAll();
  }

  @GetMapping("/{id}")
  public ResponseEntity<Object> show(@PathVariable long id) {
    Optional<UserDto> userOptional = userService.findById(id);
    if (userOptional.isPresent()) {
      return ResponseEntity.ok(userOptional.orElseThrow());
    }
    return ResponseEntity.notFound().build();
  }

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public ResponseEntity<Object> create(@Valid @RequestBody User user, BindingResult result) {
    if (result.hasErrors()) {
      return validation(result);
    }
    return ResponseEntity.status(HttpStatus.CREATED).body(userService.save(user));
  }

  @PutMapping("/{id}")
  public ResponseEntity<Object> update(
      @Valid @RequestBody UserRequest user, BindingResult result, @PathVariable Long id) {
    if (result.hasErrors()) {
      return validation(result);
    }
    Optional<UserDto> updateUser = userService.update(user, id);
    if (updateUser.isPresent()) {
      return ResponseEntity.status(HttpStatus.CREATED).body(updateUser);
    }
    return ResponseEntity.notFound().build();
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Object> remove(@PathVariable Long id) {
    if (userService.findById(id).isPresent()) {
      userService.remove(id);
      return ResponseEntity.noContent().build();
    }
    return ResponseEntity.notFound().build();
  }

  private ResponseEntity<Object> validation(BindingResult result) {
    Map<String, String> errors = new HashMap<>();
    result
        .getFieldErrors()
        .forEach(
            err ->
                errors.put(
                    err.getField(), "El campo " + err.getField() + " " + err.getDefaultMessage()));
    return ResponseEntity.badRequest().body(errors);
  }
}
