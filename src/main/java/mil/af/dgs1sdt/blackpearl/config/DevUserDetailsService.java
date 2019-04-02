//package mil.af.dgs1sdt.blackpearl.config;
//
//import mil.af.dgs1sdt.blackpearl.account.AccountService;
//import org.springframework.context.annotation.Profile;
//import org.springframework.security.core.userdetails.User;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.security.crypto.factory.PasswordEncoderFactories;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Service;
//
//@Profile("!cloud")
//@Service
//public class DevUserDetailsService implements UserDetailsService {
//  private AccountService accountService;
//
//  public DevUserDetailsService(AccountService accountService) {
//    this.accountService = accountService;
//  }
//
//  @Override
//  public UserDetails loadUserByUsername(String cardID) throws UsernameNotFoundException {
//    PasswordEncoder encoder =
//      PasswordEncoderFactories.createDelegatingPasswordEncoder();
//
//    return User.withUsername("jordan")
//      .password(encoder.encode("password"))
//      .roles("USER").build();
//  }
//}
