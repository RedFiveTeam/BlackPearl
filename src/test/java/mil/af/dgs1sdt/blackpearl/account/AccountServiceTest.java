package mil.af.dgs1sdt.blackpearl.account;

import mil.af.dgs1sdt.blackpearl.BaseIntegrationTest;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;


public class AccountServiceTest extends BaseIntegrationTest {
  @Autowired
  private AccountRepository accountRepository;

  private AccountService subject;

  @Before
  public void setUp() {
    accountRepository.save(new Account(
      "LastName.FirstName.MiddleName.123456789123", "Test", 1L, 1L, 1L, 1L));
    subject = new AccountService(accountRepository);
  }

  @Test
  public void fetchesExistingAccount() {
    Account account = subject.fetchAccountByCardId("LastName.FirstName.MiddleName.123456789123");
    assert (account != null);
  }

  @Test
  public void createsAccountWhenNonExistent() {
    subject.fetchAccountByCardId("New User");

    assert (accountRepository.findOneByCardID("New User").getCardID() == "New User");
  }
}