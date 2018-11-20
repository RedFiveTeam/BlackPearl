package mil.af.dgs1sdt.blackpearl.resource.blame;

import mil.af.dgs1sdt.blackpearl.BaseIntegrationTest;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;

public class BlameControllerTest extends BaseIntegrationTest {
  @Autowired private BlameRepository blameRepository;

  private Blame blame1;
  private Blame blame2;
  private Blame blame3;

  @Before
  public void setUp() {
    blame1 = new Blame("ADD", "Google", "JORDAN CROSS", 1542738000L);
    blame2 = new Blame("EDIT", "Google", "JORDAN CROSS", 1542733000L);
    blame3 = new Blame("DELETE", "Google", "JORDAN CROSS", 1542736000L);

    blameRepository.save(blame1);
    blameRepository.save(blame2);
    blameRepository.save(blame3);
  }

  @After
  public void tearDown() {
    super.tearDown();
  }

  @Test
  public void getAllBlameTest() {
    given()
      .port(port)
      .when()
      .get(BlameController.URI)
      .then()
      .statusCode(200)
      .body("action.size()", equalTo(3))
      .body("[0].action", equalTo("ADD"))
      .body("[1].action", equalTo("DELETE"))
      .body("[2].action", equalTo("EDIT"));
  }

}