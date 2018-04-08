package com.example.annualproject.userApi;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByPseudo(String pseudo);

    Optional<User> findById(Long id);

    Optional<User> findByToken(String token);

    @Query(nativeQuery = true,
            value = "select u.token from users u where u.pseudo = :pseudo")
    String getToken(@Param("pseudo") String pseudo);

    @Query(nativeQuery = true,
            value = "select u.pseudo from users u where u.token = :token")
    String getPseudo(@Param("token") String token);

    @Query(nativeQuery = true,
            value = "select u.id from users u where u.pseudo=:pseudo")
    String findIdByPseudo(@Param("pseudo") String pseudo);
}