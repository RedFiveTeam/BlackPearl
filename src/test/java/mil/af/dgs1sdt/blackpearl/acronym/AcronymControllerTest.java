package mil.af.dgs1sdt.blackpearl.acronym;

import com.fasterxml.jackson.core.JsonProcessingException;
import mil.af.dgs1sdt.blackpearl.BaseIntegrationTest;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;

public class AcronymControllerTest extends BaseIntegrationTest {
  @Autowired
  private AcronymRepository acronymRepository;
  private Acronym acronym1;
  private Acronym acronym2;
  private Acronym acronym3;
  private Acronym acronym4;
  private Acronym acronym5;

  @Before
  public void setUp() {
    super.setUp();
    acronym1 = new Acronym("AAA", "Aron Alen Arnolnd");
    acronym2 = new Acronym("BBB", "Baron Balen Barnold");
    acronym3 = new Acronym("JJJ", "Jim Jewlwam Jailor");
    acronym4 = new Acronym("CCC", "Creepy Cronin Crabs");
    acronym5 = new Acronym("DDD", "Dufus Dylan Doops");

    acronymRepository.save(acronym1);
    acronymRepository.save(acronym2);
    acronymRepository.save(acronym3);
    acronymRepository.save(acronym4);
    acronymRepository.save(acronym5);
  }

  @After
  public void tearDown() {
    super.tearDown();
  }

  @Test
  public void getAllAcronymsTest() {
    given()
      .port(port)
      .auth()
      .preemptive()
      .basic("jordan", "password")
      .when()
      .get(AcronymController.URI)
      .then()
      .statusCode(200)
      .body("acronym.size()", equalTo(5))
      .body("[0].acronym", equalTo(acronym1.getAcronym()))
      .body("[1].acronym", equalTo(acronym2.getAcronym()))
      .body("[2].acronym", equalTo(acronym3.getAcronym()))
      .body("[3].acronym", equalTo(acronym4.getAcronym()))
      .body("[4].acronym", equalTo(acronym5.getAcronym()));
  }

  @Test
  public void addAcronymTest() throws JsonProcessingException {
    AcronymJSON acronym = new AcronymJSON();
    acronym.setAcronym("AT");
    acronym.setDefinition("AcronymRow Test");

    given()
      .port(port)
      .auth()
      .preemptive()
      .basic("jordan", "password")
      .contentType("application/json")
      .body(acronym)
      .when()
      .post(AcronymController.URI)
      .then()
      .statusCode(200)
      .body("acronym", equalTo("AT"))
      .body("definition", equalTo("AcronymRow Test"));
  }

  @Test
  public void deleteAcronymTest() {
    given()
      .port(port)
      .auth()
      .preemptive()
      .basic("jordan", "password")
      .contentType("application/json")
      .body(acronym1.getId())
      .when()
      .delete(AcronymController.URI)
      .then()
      .statusCode(204);

  }
}