package mil.af.dgs1sdt.blackpearl.metrics;

import mil.af.dgs1sdt.blackpearl.BaseIntegrationTest;
import mil.af.dgs1sdt.blackpearl.account.Account;
import mil.af.dgs1sdt.blackpearl.account.AccountRepository;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

import static io.restassured.RestAssured.given;
import static org.junit.Assert.assertEquals;

public class LoginControllerTest extends BaseIntegrationTest {
  @Autowired
  LoginRepository loginRepository;
  @Autowired
  AccountRepository accountRepository;

  @Before
  public void setUp() {

  }

  @After
  public void tearDown() { super.tearDown();}

  @Test
  public void postNewLoginTest() throws Exception {
    accountRepository.save(new Account("card1", "name1", 1L));

    LoginJSON loginJSON = new LoginJSON("card1", "2018-11-20T20:53:12.268Z");
    List<Login> savedLogins;

    savedLogins = loginRepository.findAll();
    assertEquals(0, savedLogins.size());

    final String json = objectMapper.writeValueAsString(loginJSON);

    given()
      .port(port)
      .contentType("application/json")
      .body(json)
      .when()
      .post(LoginController.URI)
      .then()
      .statusCode(200);

    savedLogins = loginRepository.findAll();
    assertEquals(1, savedLogins.size());
  }
}
