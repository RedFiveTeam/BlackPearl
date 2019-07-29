//package mil.af.dgs1sdt.blackpearl.config;
//
//import org.springframework.context.annotation.Configuration;
//import org.springframework.context.annotation.Profile;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//
//@Profile("cloud")
//@Configuration
//public class CloudWebSecurityConfig extends SharedWebSecurityConfig {
//  @Override
//  protected void configure(HttpSecurity http) throws Exception {
//    super.configure(http);
//
//    http
//      .authorizeRequests()
//      .anyRequest()
//      .authenticated()
//      .and()
//      .oauth2Login()
//      .and()
//      .headers()
//      .frameOptions()
//      .sameOrigin()
//      .and()
//      .csrf()
//      .disable();
//  }
//}
