package mil.af.dgs1sdt.blackpearl.resource;

import mil.af.dgs1sdt.blackpearl.BaseIntegrationTest;
import mil.af.dgs1sdt.blackpearl.time.TimeController;
import mil.af.dgs1sdt.blackpearl.time.TimeRepository;
import mil.af.dgs1sdt.blackpearl.time.Timezone;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static io.restassured.RestAssured.given;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.text.MatchesPattern.matchesPattern;
import static org.hamcrest.Matchers.equalTo;


public class TimeControllerTest extends BaseIntegrationTest {
    @Autowired private TimeRepository timeRepository;
    private Timezone tz1;
    private Timezone tz2;

    @Before
    public void setUp() {
        tz1 = new Timezone("America/New_York", "LANGLEY");
        tz2 = new Timezone("America/Chicago", "CENTRAL");

        timeRepository.save(tz1);
        timeRepository.save(tz2);
    }

    @After
    public void tearDown() {
        super.tearDown();
    }

    @Test
    public void getTimeTest() {
        String timestamp = given()
                .port(port)
                .when()
                .get(TimeController.URI)
                .then()
                .statusCode(200)
                .body("zones.size()", equalTo(2))
                .body("zones[0].zone", equalTo(tz1.getZone()))
                .body("zones[0].name", equalTo(tz1.getName()))
                .body("zones[1].zone", equalTo(tz2.getZone()))
                .body("zones[1].name", equalTo(tz2.getName()))

                .extract().path("timestamp").toString();

        assertThat(timestamp, matchesPattern("^\\d{10}$"));
    }
}