package mil.af.dgs1sdt.blackpearl.metrics;

import mil.af.dgs1sdt.blackpearl.BaseIntegrationTest;
import mil.af.dgs1sdt.blackpearl.account.Account;
import mil.af.dgs1sdt.blackpearl.account.AccountRepository;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.Instant;
import java.util.List;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;
import static org.junit.Assert.assertEquals;

public class MetricControllerTest extends BaseIntegrationTest {
  @Autowired
  MetricRepository metricRepository;
  @Autowired
  AccountRepository accountRepository;

  @Before
  public void setUp() {
    super.setUp();
  }

  @After
  public void tearDown() {
    super.tearDown();
  }

  @Test
  public void postNewLoginTest() throws Exception {

    MetricJSON metricJSON = new MetricJSON("card1", 1542747192L, "VISIT", "Home");
    List<Metric> savedMetrics;

    savedMetrics = metricRepository.findAll();
    assertEquals(0, savedMetrics.size());

    final String json = objectMapper.writeValueAsString(metricJSON);

    given()
      .port(port)
      .auth()
      .preemptive()
      .basic("jordan", "password")
      .contentType("application/json")
      .body(json)
      .when()
      .post(MetricController.URI)
      .then()
      .statusCode(200);

    savedMetrics = metricRepository.findAll();
    assertEquals(1, savedMetrics.size());
  }

  @Test
  public void selectTest() {
    metricRepository.save(new Metric(
      accountRepository.findAll().get(0).getId(),
      accountRepository.findAll().get(0).getCardID(),
      Instant.now().getEpochSecond(),
      "VISIT",
      "Home"
    ));

    given()
      .port(port)
      .auth()
      .preemptive()
      .basic("jordan", "password")
      .contentType("application/json")
      .when()
      .get(MetricController.URI)
      .then()
      .statusCode(200)
      .body("size()", equalTo(1));
  }

  @Test
  public void getTotalVisits() {
    metricRepository.save(new Metric(
      accountRepository.findAll().get(0).getId(),
      accountRepository.findAll().get(0).getCardID(),
      Instant.now().getEpochSecond(),
      "VISIT",
      "Home"
    ));

    metricRepository.save(new Metric(
      accountRepository.findAll().get(0).getId(),
      accountRepository.findAll().get(0).getCardID(),
      Instant.now().getEpochSecond(),
      "VISIT",
      "Home"
    ));

    given()
      .port(port)
      .auth()
      .preemptive()
      .basic("jordan", "password")
      .contentType("application/json")
      .when()
      .get(MetricController.URI + "/visits")
      .then()
      .statusCode(200)
      .body(equalTo("2"));
  }

  @Test
  public void getUserCount() {
    accountRepository.save(new Account("card1", "Test", 1L, 1L, 0L, 1L));
    accountRepository.save(new Account("card2", "Test", 1L, 1L, 0L, 1L));
    accountRepository.save(new Account("card3", "Test", 1L, 1L, 0L, 1L));

    given()
      .port(port)
      .auth()
      .preemptive()
      .basic("jordan", "password")
      .contentType("application/json")
      .when()
      .get(MetricController.URI + "/users")
      .then()
      .statusCode(200)
      .body(equalTo("4")); // plus Jordan from super setup
  }

  @Test
  public void getResourceClickCount() {
    metricRepository.save(new Metric(
      accountRepository.findAll().get(0).getId(),
      accountRepository.findAll().get(0).getCardID(),
      Instant.now().getEpochSecond(),
      "CLICK_RESOURCE",
      "Site 1"
    ));
    metricRepository.save(new Metric(
      accountRepository.findAll().get(0).getId(),
      accountRepository.findAll().get(0).getCardID(),
      Instant.now().getEpochSecond(),
      "CLICK_RESOURCE",
      "Site 2"
    ));
    metricRepository.save(new Metric(
      accountRepository.findAll().get(0).getId(),
      accountRepository.findAll().get(0).getCardID(),
      Instant.now().getEpochSecond(),
      "CLICK_RESOURCE",
      "Site 3"
    ));
    metricRepository.save(new Metric(
      accountRepository.findAll().get(0).getId(),
      accountRepository.findAll().get(0).getCardID(),
      Instant.now().getEpochSecond(),
      "CLICK_RESOURCE",
      "Site 4"
    ));

    given()
      .port(port)
      .auth()
      .preemptive()
      .basic("jordan", "password")
      .contentType("application/json")
      .when()
      .get(MetricController.URI + "/resource-clicks")
      .then()
      .statusCode(200)
      .body(equalTo("4"));
  }

  @Test
  public void getWidgetUseCount() {
//  these are 4 valid widget clicks
    metricRepository.save(new Metric(
      accountRepository.findAll().get(0).getId(),
      accountRepository.findAll().get(0).getCardID(),
      Instant.now().getEpochSecond(),
      "CLICK_ACRONYM",
      "Site 1"
    ));
    metricRepository.save(new Metric(
      accountRepository.findAll().get(0).getId(),
      accountRepository.findAll().get(0).getCardID(),
      Instant.now().getEpochSecond(),
      "CLICK_WEATHER",
      "Site 2"
    ));
    metricRepository.save(new Metric(
      accountRepository.findAll().get(0).getId(),
      accountRepository.findAll().get(0).getCardID(),
      Instant.now().getEpochSecond(),
      "CLICK_COORD",
      "Site 3"
    ));
    metricRepository.save(new Metric(
      accountRepository.findAll().get(0).getId(),
      accountRepository.findAll().get(0).getCardID(),
      Instant.now().getEpochSecond(),
      "CLICK_MEASUREMENT",
      "Site 4"
    ));

//  these are 2 invalid widgets (do NOT count)
    metricRepository.save(new Metric(
      accountRepository.findAll().get(0).getId(),
      accountRepository.findAll().get(0).getCardID(),
      Instant.now().getEpochSecond(),
      "CLICK_OP",
      "Site 4"
    ));
    metricRepository.save(new Metric(
      accountRepository.findAll().get(0).getId(),
      accountRepository.findAll().get(0).getCardID(),
      Instant.now().getEpochSecond(),
      "CLICK_RESOURCE",
      "Site 4"
    ));

    given()
      .port(port)
      .auth()
      .preemptive()
      .basic("jordan", "password")
      .contentType("application/json")
      .when()
      .get(MetricController.URI + "/widget-uses")
      .then()
      .statusCode(200)
      .body(equalTo("4"));
  }

  @Test
  public void getTopResources() {
    setupResources();

    given()
      .port(port)
      .auth()
      .preemptive()
      .basic("jordan", "password")
      .contentType("application/json")
      .when()
      .get(MetricController.URI + "/top-resources")
      .then()
      .statusCode(200)
      .body("size()", equalTo(5))
      .body("[0].name", equalTo("Site 9"))
      .body("[0].clicks", equalTo(90))
      .body("[4].name", equalTo("Site 5"))
      .body("[4].clicks", equalTo(50));
  }

  @Test
  public void getTopActions() {
    setupActions();

    given()
      .port(port)
      .auth()
      .preemptive()
      .basic("jordan", "password")
      .contentType("application/json")
      .when()
      .get(MetricController.URI + "/top-actions")
      .then()
      .statusCode(200)
      .body("size()", equalTo(5))
      .body("[0].name", equalTo("CLICK_MEASUREMENT"))
      .body("[0].clicks", equalTo(50))
      .body("[4].name", equalTo("EDIT_RESOURCE"))
      .body("[4].clicks", equalTo(10));
  }

  @Test
  public void getLatestActions() {
    setupActions();

    given()
      .port(port)
      .auth()
      .preemptive()
      .basic("jordan", "password")
      .contentType("application/json")
      .when()
      .get(MetricController.URI + "/latest-actions")
      .then()
      .statusCode(200)
      .body("size()", equalTo(50))
      .body("[0].action", equalTo("EDIT_RESOURCE"))
      .body("[49].action", equalTo("CLICK_WEATHER"));
  }

  private void setupResources() {
    for (int i = 0; i < 10; i++) {
      for (int j = 0; j < i * 10; j++) {
        metricRepository.save(new Metric(
          accountRepository.findAll().get(0).getId(),
          accountRepository.findAll().get(0).getCardID(),
          Instant.now().getEpochSecond(),
          "CLICK_RESOURCE",
          "Site " + i
        ));
      }
    }
  }

  private void setupActions() {
    Long userId = accountRepository.findAll().get(0).getId();
    String cardId = accountRepository.findAll().get(0).getCardID();

//    do not count CLICK_RESOURCE and VISIT in top actions (so set to out rank all others and test that it excludes)
    for (int i = 0; i < 60; i++) {
      metricRepository.save(
        new Metric(
          userId,
          cardId,
          Instant.now().getEpochSecond() - 60,
          "CLICK_RESOURCE",
          "Site " + i
        ));
    }

    for (int i = 0; i < 60; i++) {
      metricRepository.save(
        new Metric(
          userId,
          cardId,
          Instant.now().getEpochSecond() - 60,
          "VISIT",
          "Site " + i
        ));
    }

    for (int i = 0; i < 50; i++) {
      metricRepository.save(
        new Metric(
          userId,
          cardId,
          Instant.now().getEpochSecond() - 50,
          "CLICK_MEASUREMENT",
          ""
        )
      );
    }

    for (int i = 0; i < 40; i++) {
      metricRepository.save(
        new Metric(
          userId,
          cardId,
          Instant.now().getEpochSecond() - 40,
          "CLICK_ACRONYM",
          ""
        )
      );
    }

    for (int i = 0; i < 30; i++) {
      metricRepository.save(
        new Metric(
          userId,
          cardId,
          Instant.now().getEpochSecond() - 30,
          "CLICK_WEATHER",
          ""
        )
      );
    }

    for (int i = 0; i < 20; i++) {
      metricRepository.save(
        new Metric(
          userId,
          cardId,
          Instant.now().getEpochSecond() - 20,
          "CLICK_COORD",
          ""
        )
      );
    }

    for (int i = 0; i < 10; i++) {
      metricRepository.save(
        new Metric(
          userId,
          cardId,
          Instant.now().getEpochSecond() - 10,
          "EDIT_RESOURCE",
          ""
        )
      );
    }
  }
}
