package mil.af.dgs1sdt.blackpearl.information;

import mil.af.dgs1sdt.blackpearl.BaseIntegrationTest;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;

public class InformationControllerTest extends BaseIntegrationTest {
  @Autowired
  InformationRepository informationRepository;
  private Information information;

  @Before
  public void setUp() {
    super.setUp();
    information = new Information("Phone Number", "123-555-0123");
    informationRepository.save(information);
  }

  @After
  public void tearDown() { super.tearDown(); }

  @Test
  public void getInformationTest() {
    given()
      .port(port)
      .auth()
      .preemptive()
      .basic("jordan", "password")
      .when()
      .get(InformationController.URI)
      .then()
      .statusCode(200)
      .body("[0].name", equalTo("Phone Number"))
      .body("[0].content", equalTo("123-555-0123"));
  }

  @Test
  public void updateInformationTest() throws Exception {
    information.setContent("867-5309");

    Information[] i = {information};

    final String json = objectMapper.writeValueAsString(i);

    given()
      .port(port)
      .auth()
      .preemptive()
      .basic("jordan", "password")
      .contentType("application/json")
      .body(json)
      .when()
      .put(InformationController.URI)
      .then()
      .statusCode(200)
      .body("[0].content", equalTo("867-5309"));
  }

}