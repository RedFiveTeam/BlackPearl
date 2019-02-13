package mil.af.dgs1sdt.blackpearl.time;

import mil.af.dgs1sdt.blackpearl.BaseIntegrationTest;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;

public class TimezoneControllerTest extends BaseIntegrationTest {
  @Autowired
  private TimezoneRepository timezoneRepository;
  private Timezone tz1;
  private Timezone tz2;

  @Before
  public void setUp() {
    super.setUp();
    tz1 = new Timezone(1, "America/New_York", "LANGLEY");
    tz2 = new Timezone(2, "America/Chicago", "CENTRAL");

    timezoneRepository.save(tz1);
    timezoneRepository.save(tz2);
  }

  @After
  public void tearDown() {
    super.tearDown();
  }

  @Test
  public void getTimezonesTest() {
    given()
      .port(port)
      .auth()
      .preemptive()
      .basic("jordan", "password")
      .when()
      .get(TimezoneController.URI)
      .then()
      .statusCode(200)
      .body("[0].zone", equalTo("America/New_York"))
      .body("[1].zone", equalTo("America/Chicago"))
      .body("[0].name", equalTo("LANGLEY"));
  }

  @Test
  public void updateTimezonesTest() throws Exception {
    tz1.setName("JOHAN");
    tz1.setZone("Africa/Johannesburg");
    tz1.setPosition(1);

    Timezone[] tz = {tz1, tz2};

    final String json = objectMapper.writeValueAsString(tz);

    given()
      .port(port)
      .auth()
      .preemptive()
      .basic("jordan", "password")
      .contentType("application/json")
      .body(json)
      .when()
      .put(TimezoneController.URI)
      .then()
      .statusCode(200)
      .body("[0].name", equalTo("JOHAN"))
      .body("[1].name", equalTo("CENTRAL"))
      .body("[0].zone", equalTo("Africa/Johannesburg"))
      .body("[1].zone", equalTo("America/Chicago"));
  }
}