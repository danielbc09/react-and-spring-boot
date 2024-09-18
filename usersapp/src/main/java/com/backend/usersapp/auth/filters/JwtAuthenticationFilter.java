package com.backend.usersapp.auth.filters;

import com.backend.usersapp.models.entities.User;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.io.IOException;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import static com.backend.usersapp.auth.TokenJwtConfig.*;

public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

  AuthenticationManager authenticationManager;

  public JwtAuthenticationFilter(AuthenticationManager authenticationManager) {
    this.authenticationManager = authenticationManager;
  }

  @Override
  public Authentication attemptAuthentication(
      HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
    User user;
    String username = null;
    String password = null;
    try {
      user = new ObjectMapper().readValue(request.getInputStream(), User.class);
      username = user.getUsername();
      password = user.getPassword();

    } catch (IOException e) {
      e.printStackTrace();
    }
    UsernamePasswordAuthenticationToken authToken =
        new UsernamePasswordAuthenticationToken(username, password);
    return authenticationManager.authenticate(authToken);
  }

  @Override
  protected void successfulAuthentication(
      HttpServletRequest request,
      HttpServletResponse response,
      FilterChain chain,
      Authentication authResult)
      throws IOException, ServletException {
    String username =
        ((org.springframework.security.core.userdetails.User) authResult.getPrincipal())
            .getUsername();

    Collection<? extends GrantedAuthority> roles = authResult.getAuthorities();
    Map<String, Object> claims = new HashMap<>();
    boolean isAdmin = roles.stream().anyMatch(role -> role.getAuthority().equals("ROLE_ADMIN"));
    claims.put("authorities", new ObjectMapper().writeValueAsString(roles));
    claims.put("isAdmin", isAdmin);
    claims.put("username", username);

    String token =
        Jwts.builder()
            .claims(claims)
            .subject(username)
            .signWith(SECRET_KEY_TOKEN)
            .issuedAt(new Date())
            .expiration(new Date(System.currentTimeMillis() + 3600000))
            .compact();
    response.addHeader(HEADER_AUTHORIZATION, "Bearer " + token);
    Map<String, Object> body = new HashMap<>();
    body.put("token", token);
    body.put("message", String.format("Hola %s, has iniciado sesion con exito!", username));
    body.put("username", username);
    response.getWriter().write(new ObjectMapper().writeValueAsString(body));
    response.setStatus(200);
    response.setContentType("application/json");
  }

  @Override
  protected void unsuccessfulAuthentication(
      HttpServletRequest request, HttpServletResponse response, AuthenticationException failed)
      throws IOException, ServletException {
    Map<String, Object> body = new HashMap<>();
    body.put("message", "Error en la autenticación!");
    body.put("error", failed.getMessage());
    response.getWriter().write(new ObjectMapper().writeValueAsString(body));
    response.setStatus(401);
    response.setContentType(HEADER_APPLICATION);
  }
}
