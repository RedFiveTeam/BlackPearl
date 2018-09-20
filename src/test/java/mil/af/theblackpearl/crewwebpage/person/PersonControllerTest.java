package mil.af.theblackpearl.crewwebpage.person;

import mil.af.theblackpearl.crewwebpage.BaseIntegrationTest;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static io.restassured.RestAssured.given;
import static io.restassured.RestAssured.objectMapper;
import static org.hamcrest.Matchers.hasItem;
import static org.hamcrest.Matchers.equalTo;

public class PersonControllerTest extends BaseIntegrationTest {
    @Autowired
    private PersonRepository personRepository;
    private Person person1;

    @Before
    public void setUp() {
        person1 = new Person("Sucks", "Jorge");
        personRepository.save(person1);
    }

    //This works but its kinda gross but maybe that is ok
    @After
    public void tearDown() {
        personRepository.delete(person1);
    }

    @Test
    public void allPerson() {
        given()
                .port(port)
                .when()
                .get(PersonController.URI + "/all")
                .then()
                .statusCode(200)
                .body("firstName", hasItem("Jorge"))
                .body("lastName", hasItem("Sucks")); // We need to use hasItem here, see the stackoverflow tab
    }

    @Test
    public void addPerson() {
//        final String json = objectMapper.writeValueAsString();

        given()
                .port(port)
//                .body()
                .when()
                .post(PersonController.URI + "/add")
                .then()
                .statusCode(200)
                .body("result", equalTo("Saved"));
    }
}
