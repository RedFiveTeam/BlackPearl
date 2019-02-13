package mil.af.dgs1sdt.blackpearl.time;

import mil.af.dgs1sdt.blackpearl.BaseIntegrationTest;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static io.restassured.RestAssured.given;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.text.MatchesPattern.matchesPattern;


public class TimeControllerTest extends BaseIntegrationTest {
  @Autowired
  private TimeRepository timeRepository;
  private Timezone tz1;
  private Timezone tz2;

  @Before
  public void setUp() {
    super.setUp();
    tz1 = new Timezone(1, "America/New_York", "LANGLEY");
    tz2 = new Timezone(2, "America/Chicago", "CENTRAL");

    timeRepository.save(tz1);
    timeRepository.save(tz2);
  }

  @After
  public void tearDown() {
    super.tearDown();
  }

  @Test
  public void getTimeTest() {
    String timestamp =
      given()
        .port(port)
        .auth()
        .preemptive()
        .basic("jordan", "password")
        .when()
        .get(TimeController.URI)
        .then()
        .statusCode(200)
        .body("zones.size()", equalTo(2))
        .body("zones[0].zone", equalTo(tz1.getZone()))
        .body("zones[1].zone", equalTo(tz2.getZone()))

        .extract().path("timestamp").toString();

    assertThat(timestamp, matchesPattern("^\\d{10}$"));
  }
}