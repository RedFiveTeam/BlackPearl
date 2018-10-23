package mil.af.dgs1sdt.blackpearl.resource;

import mil.af.dgs1sdt.blackpearl.BaseIntegrationTest;
import mil.af.dgs1sdt.blackpearl.time.TimeController;
import org.junit.Test;

import static io.restassured.RestAssured.given;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.text.MatchesPattern.matchesPattern;

public class TimeControllerTest extends BaseIntegrationTest {

    @Test
    public void getTimeTest() {
        String timestamp = given()
                .port(port)
                .when()
                .get(TimeController.URI)
                .then()
                .statusCode(200)
                .extract().path("timestamp").toString();

        assertThat(timestamp, matchesPattern("^\\d{10}$"));
    }
}
