package mil.af.dgs1sdt.blackpearl.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.core.annotation.Order;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Configuration
@EnableWebSecurity
@Profile("io")
@Order(99)
public class IOWebSecurityConfig extends SharedWebSecurityConfig {
  @Autowired
  private AuthenticationEntryPoint authenticationEntryPoint;

  @Autowired
  public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
    auth.inMemoryAuthentication()
      .withUser("YODA.MASTER.MIDDLE.0123456789").password(passwordEncoder().encode(""))
      .authorities("ROLE_USER")
      .and()
      .withUser("CROSS.JORDAN.MIDDLE.0123456789").password(passwordEncoder().encode(""))
      .authorities("ROLE_USER");

    auth.eraseCredentials(false);
  }

  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http.authorizeRequests().antMatchers("/login").authenticated()
      .and()
      .httpBasic()
      .authenticationEntryPoint(authenticationEntryPoint)
      .and().csrf().disable();
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }
}