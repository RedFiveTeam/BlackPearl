package mil.af.dgs1sdt.blackpearl.metrics;

import mil.af.dgs1sdt.blackpearl.BaseIntegrationTest;
import mil.af.dgs1sdt.blackpearl.account.Account;
import mil.af.dgs1sdt.blackpearl.account.AccountRepository;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Date;
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
    accountRepository.save(new Account("card1", "name1", 1L, 1L));
  }

  @After
  public void tearDown() {
    super.tearDown();
  }

  @Test
  public void postNewLoginTest() throws Exception {

    MetricJSON metricJSON = new MetricJSON("card1", "2018-11-20T20:53:12.268Z");
    List<Metric> savedMetrics;

    savedMetrics = metricRepository.findAll();
    assertEquals(0, savedMetrics.size());

    final String json = objectMapper.writeValueAsString(metricJSON);

    given()
      .port(port)
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
    metricRepository.save(new Metric(accountRepository.findAll().get(0), new Date()));

    given()
      .port(port)
      .contentType("application/json")
      .when()
      .get(MetricController.URI)
      .then()
      .statusCode(200)
      .body("size()", equalTo(1));
  }
}
