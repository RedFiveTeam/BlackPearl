package mil.af.dgs1sdt.blackpearl.account;

import mil.af.dgs1sdt.blackpearl.BaseIntegrationTest;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;

public class AccountControllerTest extends BaseIntegrationTest {
  @Autowired
  AccountRepository accountRepository;
  private Account account;

  @Before
  public void setUp() {
    super.setUp();
    account = new Account("name2", "Test", 2L, 1L, 0L, 1L);

    accountRepository.save(account);
  }

  @After
  public void tearDown() {
    super.tearDown();
  }

  @Test
  public void updateAccountTest() throws Exception {
    account.setSpecialty(1L);

    final String json = objectMapper.writeValueAsString(account);

    given()
      .port(port)
      .auth()
      .preemptive()
      .basic("jordan", "password")
      .contentType("application/json")
      .body(json)
      .when()
      .put(AccountController.URI + "/" + account.getId())
      .then()
      .statusCode(200)
      .body("specialty", equalTo(1));
  }
}