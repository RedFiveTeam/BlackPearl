package mil.af.dgs1sdt.blackpearl.account;

import org.springframework.stereotype.Service;

@Service
public class AccountService {

  private AccountRepository accountRepository;

  public AccountService(AccountRepository accountRepository) {
    this.accountRepository = accountRepository;
  }

  public Account fetchAccountByCardId(String cardId) {
    Account account = accountRepository.findOneByCardID(cardId);
    if (account == null) {
      account = accountRepository.save(new Account(cardId, "Test", 1L, 1L, 0L, 1L));
    }
    account.setPassword("password");
    return account;
  }
}