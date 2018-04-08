package com.example.annualproject.userApi;

import org.springframework.test.context.jdbc.Sql;


import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.TYPE;
import static java.lang.annotation.RetentionPolicy.RUNTIME;
import static org.springframework.test.context.jdbc.Sql.ExecutionPhase.AFTER_TEST_METHOD;
import static org.springframework.test.context.jdbc.Sql.ExecutionPhase.BEFORE_TEST_METHOD;

/**
 * Created by bench on 07/03/2017.
 */
@Retention(RUNTIME)
@Target(value = TYPE)
@Sql(executionPhase = BEFORE_TEST_METHOD, scripts = "classpath:user-init.sql")
@Sql(executionPhase = AFTER_TEST_METHOD, scripts = "classpath:user-cleanup.sql")
public @interface UserData {
}