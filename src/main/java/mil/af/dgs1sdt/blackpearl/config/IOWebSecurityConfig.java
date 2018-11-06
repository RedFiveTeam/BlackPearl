package mil.af.dgs1sdt.blackpearl.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;

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
      .withUser("YODA").password(passwordEncoder().encode("1"))
      .authorities("ROLE_USER")
      .and()
      .withUser("JORDAN").password(passwordEncoder().encode("1"))
      .authorities("ROLE_USER");

    auth.eraseCredentials(false);
  }

  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http.authorizeRequests().anyRequest().authenticated()
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
