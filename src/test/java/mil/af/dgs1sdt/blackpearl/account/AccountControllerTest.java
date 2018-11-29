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
    account = new Account("name2", "role2", 2L, 2L);

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
      .contentType("application/json")
      .body(json)
      .when()
      .put(AccountController.URI + "/" + account.getId())
      .then()
      .log().all()
      .statusCode(200)
      .body("specialty", equalTo(1));
  }
}