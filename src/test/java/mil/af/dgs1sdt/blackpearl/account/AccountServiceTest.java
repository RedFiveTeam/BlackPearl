package mil.af.dgs1sdt.blackpearl.account;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;


@RunWith(MockitoJUnitRunner.class)
public class AccountServiceTest {
  @Mock private AccountRepository profileRepository;
  private AccountService subject;

  @Before
  public void setUp() { subject = new AccountService(profileRepository); }

  @Test
  public void getsTheProfileGivenTheCardId() {
    subject.getProfile("LastName.FirstName.MiddleName.123456789123");
    verify(profileRepository).findOneByCardID("LastName.FirstName.MiddleName.123456789123");
  }

  @Test
  public void createsAProfileIfOneDoesNotExist() {
    when(subject.getProfile("LastName.FirstName.MiddleName.123456789123"))
      .thenReturn(null);

    subject.getProfile("LastName.FirstName.MiddleName.123456789123");

    verify(profileRepository).save(new Account("LastName.FirstName.MiddleName.123456789123", "FirstName LastName", 1L, 1L, 0L));
  }
 }