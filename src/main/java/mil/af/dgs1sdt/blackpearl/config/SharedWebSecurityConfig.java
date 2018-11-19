package mil.af.dgs1sdt.blackpearl.config;

import mil.af.dgs1sdt.blackpearl.account.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableWebSecurity
public class SharedWebSecurityConfig extends WebSecurityConfigurerAdapter {

  @Autowired
  private AccountService accountService;

  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http.authorizeRequests()
      .anyRequest().permitAll()
      .and()
      .x509()
      .subjectPrincipalRegex("CN=(.*?)(?:,|$)")
      .userDetailsService(accountService)
      .and().csrf().disable();
  }
}