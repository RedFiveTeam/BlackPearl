package mil.af.dgs1sdt.blackpearl.account;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class AccountService implements UserDetailsService {

  private AccountRepository accountRepository;

  @Autowired
  public AccountService(AccountRepository accountRepository) {
    this.accountRepository = accountRepository;
  }

  public Account getProfile(String cardId) {
    Account account = accountRepository.findOneByCardID(cardId);
    if (account == null) {
      String[] nameSplit = cardId.split("\\.");
      String name = nameSplit[1] + " " + nameSplit[0];
      account = accountRepository.save(new Account(cardId, name, 1L, 1L));
    }
    return account;
  }

  @Override
  public UserDetails loadUserByUsername(String cardId) throws UsernameNotFoundException {
    Account profile = getProfile(cardId);
    return new User(
      profile.getCardID(),
      "",
      AuthorityUtils.commaSeparatedStringToAuthorityList(profile.getRole().toString())
    );
  }
}
