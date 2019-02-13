package mil.af.dgs1sdt.blackpearl.resource.blame;

import mil.af.dgs1sdt.blackpearl.BaseIntegrationTest;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.Instant;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;

public class BlameControllerTest extends BaseIntegrationTest {
  @Autowired private BlameRepository blameRepository;

  private Blame blame1;
  private Blame blame2;
  private Blame blame3;
  private Blame blame4;

  @Before
  public void setUp() {
    super.setUp();
    Long today = Instant.now().getEpochSecond();
    Long day = 86400L;
    blame1 = new Blame("ADD", "Google", "JORDAN CROSS", today - day);
    blame2 = new Blame("EDIT", "Google", "JORDAN CROSS", today - (day * 7));
    blame3 = new Blame("DELETE", "Google", "JORDAN CROSS", today - (day * 2));
    blame4 = new Blame("ADD", "Google", "JORDAN CROSS", today - (day * 35));

    blameRepository.save(blame1);
    blameRepository.save(blame2);
    blameRepository.save(blame3);
    blameRepository.save(blame4);
  }

  @After
  public void tearDown() {
    super.tearDown();
  }

  @Test
  public void getAllBlameTest() {
    given()
      .port(port)
      .auth()
      .preemptive()
      .basic("jordan", "password")
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