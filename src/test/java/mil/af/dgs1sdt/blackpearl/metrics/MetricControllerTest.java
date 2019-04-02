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
    accountRepository.save(new Account("card1", "Test", 1L, 1L, 0L, 1L, "UNCLASSIFIED"));
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
}
