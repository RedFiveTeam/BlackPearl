package mil.af.dgs1sdt.blackpearl.resource.click;

import com.fasterxml.jackson.core.JsonProcessingException;
import mil.af.dgs1sdt.blackpearl.BaseIntegrationTest;
import mil.af.dgs1sdt.blackpearl.resource.Resource;
import mil.af.dgs1sdt.blackpearl.resource.ResourceRepository;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.Instant;

import static org.hamcrest.Matchers.equalTo;

import static io.restassured.RestAssured.given;

public class ClickControllerTest extends BaseIntegrationTest {
  @Autowired private ClickRepository clickRepository;
  @Autowired private ResourceRepository resourceRepository;

  private Resource resource1;
  private Resource resource2;
  private Resource resource3;
  private Resource resource4;
  private Resource resource5;

  private Click click1;
  private Click click2;
  private Click click3;
  private Click click4;
  private Click click5;

  @Before
  public void setUp() {
    super.setUp();
    resource1 = new Resource("Google", "https://www.google.com", 1L, "GUEST.GUEST.GUEST.0123456789", 0L, Instant.now().getEpochSecond());
    resource2 = new Resource("Google", "https://www.google.com", 1L, "GUEST.GUEST.GUEST.0123456789", 0L, Instant.now().getEpochSecond());
    resource3 = new Resource("Google", "https://www.google.com", 1L, "GUEST.GUEST.GUEST.0123456789", 0L, Instant.now().getEpochSecond());
    resource4 = new Resource("Google", "https://www.google.com", 1L, "GUEST.GUEST.GUEST.0123456789", 0L, Instant.now().getEpochSecond());
    resource5 = new Resource("Google", "https://www.google.com", 1L, "GUEST.GUEST.GUEST.0123456789", 0L, Instant.now().getEpochSecond());

    resourceRepository.save(resource1);
    resourceRepository.save(resource2);
    resourceRepository.save(resource3);
    resourceRepository.save(resource4);
    resourceRepository.save(resource5);

    Long today = (Instant.now().getEpochSecond() / 86400);

    click1 = new Click(resource1.getId(), today, 120L);
    click2 = new Click(resource2.getId(), today, 120L);
    click3 = new Click(resource3.getId(), today, 120L);
    click4 = new Click(resource1.getId(), today - 1, 120L);
    click5 = new Click(resource1.getId(), today - 50, 120L);

    clickRepository.save(click1);
    clickRepository.save(click2);
    clickRepository.save(click3);
    clickRepository.save(click4);
    clickRepository.save(click5);
  }

  @After
  public void tearDown() { super.tearDown(); }

  @Test
  public void getRecentClicksTest() {
    given()
      .port(port)
      .auth()
      .preemptive()
      .basic("jordan", "password")
      .when()
      .get(ClickController.URI)
      .then()
      .statusCode(200)
      .body("id.size()", equalTo(4))
      .body("[0].resourceID", equalTo(resource1.getId().intValue()))
      .body("[0].clicks", equalTo(120))
      .body("[1].resourceID", equalTo(resource2.getId().intValue()))
      .body("[1].clicks", equalTo(120))
      .body("[2].resourceID", equalTo(resource3.getId().intValue()))
      .body("[2].clicks", equalTo(120))
      .body("[3].resourceID", equalTo(resource1.getId().intValue()))
      .body("[3].clicks", equalTo(120));
  }

  @Test
  public void updateTest() throws JsonProcessingException {
    given()
      .port(port)
      .auth()
      .preemptive()
      .basic("jordan", "password")
      .contentType("application/json")
      .when()
      .get(ClickController.URI + "/" + resource1.getId())
      .then()
      .statusCode(200)
      .body("clicks", equalTo(121));

    given()
      .port(port)
      .auth()
      .preemptive()
      .basic("jordan", "password")
      .contentType("application/json")
      .when()
      .get(ClickController.URI + "/" + resource1.getId())
      .then()
      .statusCode(200)
      .body("clicks", equalTo(122));

    given()
      .port(port)
      .auth()
      .preemptive()
      .basic("jordan", "password")
      .contentType("application/json")
      .when()
      .get(ClickController.URI + "/" + resource5.getId())
      .then()
      .statusCode(200)
      .body("clicks", equalTo(1));
  }
}