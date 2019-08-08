package mil.af.dgs1sdt.blackpearl.resource;

import com.fasterxml.jackson.core.JsonProcessingException;
import mil.af.dgs1sdt.blackpearl.BaseIntegrationTest;
import mil.af.dgs1sdt.blackpearl.resource.blame.BlameController;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.Instant;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;

public class ResourceControllerTest extends BaseIntegrationTest {
  @Autowired
  private ResourceRepository resourceRepository;

  private Resource resource1;
  private Resource resource2;
  private Resource resource3;
  private Resource resource4;
  private Resource resource5;
  private Resource resource6;

  @Before
  public void setUp() {
    super.setUp();

    resource1 = new Resource("Googerbhjwrle", "https://www.gowqeqweogle.com", 1L, "Guest", 0L,
      Instant.now().getEpochSecond());
    resource2 = new Resource("Yahoo", "https://www.yahoo.com", 2L, "Guest", 1L, Instant.now().getEpochSecond());
    resource3 = new Resource("eBay", "https://www.ebay.com", 3L, "Guest", 2L, Instant.now().getEpochSecond());
    resource4 = new Resource("notGoogle", "https://www.notgoogle.com", 1L, "Guest", 3L, Instant.now().getEpochSecond());
    resource5 = new Resource("Jordan's Google", "https://www.google.com", 1L, "JORDAN", 0L,
      Instant.now().getEpochSecond());
    resource6 = new Resource("Jordan's Facebook", "https://www.facebook.com", 1L, "JORDAN", 1L,
      Instant.now().getEpochSecond());

    resourceRepository.save(resource1);
    resourceRepository.save(resource2);
    resourceRepository.save(resource3);
    resourceRepository.save(resource4);
    resourceRepository.save(resource5);
    resourceRepository.save(resource6);
  }

  @After
  public void tearDown() {
    super.tearDown();
  }

  @Test
  public void getAllResourcesTest() {
    given()
      .port(port)
      .auth()
      .preemptive()
      .basic("jordan", "password")
      .when()
      .get(ResourceController.URI)
      .then()
      .statusCode(200)
      .body("url.size()", equalTo(6))
      .body("[0].url", equalTo(resource1.getUrl()))
      .body("[1].url", equalTo(resource2.getUrl()))
      .body("[2].url", equalTo(resource3.getUrl()))
      .body("[3].url", equalTo(resource4.getUrl()))
      .body("[4].accountID", equalTo(resource5.getAccountID()))
      .body("[5].accountID", equalTo(resource6.getAccountID()));
  }

  @Test
  public void goFunctionTest() {
    given()
      .port(port)
      .auth()
      .preemptive()
      .basic("jordan", "password")
      .when()
      .get(ResourceController.URI + "/go?q=oo")
      .then()
      .statusCode(200);
  }

  @Test
  public void addResourceTest() throws JsonProcessingException {
    ResourceJSON resource = new ResourceJSON();
    resource.setName("Test");
    resource.setUrl("https://www.test.com");
    resource.setCategoryID(1L);

    given()
      .port(port)
      .auth()
      .preemptive()
      .basic("jordan", "password")
      .contentType("application/json")
      .body(resource)
      .when()
      .post(ResourceController.URI)
      .then()
      .statusCode(200)
      .body("url", equalTo("https://www.test.com"))
      .body("name", equalTo("Test"))
      .body("categoryID", equalTo(1));

    given()
      .port(port)
      .auth()
      .preemptive()
      .basic("jordan", "password")
      .when()
      .get(BlameController.URI)
      .then()
      .statusCode(200)
      .body("action.size()", equalTo(1))
      .body("[0].action", equalTo("ADD"));
  }

  @Test
  public void deleteTest() {
    given()
      .port(port)
      .auth()
      .preemptive()
      .basic("jordan", "password")
      .contentType("application/json")
      .body(resource1.getId())
      .when()
      .delete(ResourceController.URI)
      .then()
      .statusCode(204);

    given()
      .port(port)
      .auth()
      .preemptive()
      .basic("jordan", "password")
      .when()
      .get(BlameController.URI)
      .then()
      .statusCode(200)
      .body("action.size()", equalTo(1))
      .body("[0].action", equalTo("DELETE"));
  }

  @Test
  public void updateTest() throws Exception {
    resource4.setUrl("https://www.google.com");
    resource4.setName("Google");

    final String json = objectMapper.writeValueAsString(resource4);
    given()
      .port(port)
      .auth()
      .preemptive()
      .basic("jordan", "password")
      .contentType("application/json")
      .body(json)
      .when()
      .put(ResourceController.URI + "/4")
      .then()
      .statusCode(200)
      .body("url", equalTo("https://www.google.com"));

    given()
      .port(port)
      .auth()
      .preemptive()
      .basic("jordan", "password")
      .when()
      .get(BlameController.URI)
      .then()
      .statusCode(200)
      .body("action.size()", equalTo(1))
      .body("[0].action", equalTo("EDIT"));
  }

  @Test
  public void updatePassedTest() throws Exception {
    resource1.setPosition(3L);
    resource2.setPosition(2L);
    resource3.setPosition(1L);
    resource4.setPosition(0L);

    Resource[] resources = {resource1, resource2, resource3, resource4};

    final String json = objectMapper.writeValueAsString(resources);

    given()
      .port(port)
      .auth()
      .preemptive()
      .basic("jordan", "password")
      .contentType("application/json")
      .body(json)
      .when()
      .put(ResourceController.URI)
      .then()
      .statusCode(200)
      .body("[0].position", equalTo(3))
      .body("[1].position", equalTo(2))
      .body("[2].position", equalTo(1))
      .body("[3].position", equalTo(0));
  }
}
