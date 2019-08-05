package mil.af.dgs1sdt.blackpearl.metrics;

import mil.af.dgs1sdt.blackpearl.BaseIntegrationTest;
import mil.af.dgs1sdt.blackpearl.account.Account;
import mil.af.dgs1sdt.blackpearl.account.AccountRepository;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;

public class UserControllerTest extends BaseIntegrationTest {
  @Autowired
  AccountRepository accountRepository;
  private Account account1, account2;

  @Before
  public void setUp() {
    super.setUp();
    account1 = new Account("name1", "Test", 1L, 1L, 0L, 1L);
    account2 = new Account("name2", "Test", 1L, 1L, 0L, 1L);

    accountRepository.save(account1);
    accountRepository.save(account2);
  }

  @After
  public void tearDown() {
    super.tearDown();
  }

  @Test
  public void getAllUsersTest() {
    given()
      .port(port)
      .auth()
      .preemptive()
      .basic("jordan", "password")
      .when()
      .get(UserController.URI)
      .then()
      .statusCode(200)
      .body("users.size()", equalTo(3));
  }
}
