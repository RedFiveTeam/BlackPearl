package mil.af.dgs1sdt.blackpearl.person;

import mil.af.dgs1sdt.blackpearl.BaseIntegrationTest;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.hasItem;
import static org.hamcrest.Matchers.equalTo;

public class PersonControllerTest extends BaseIntegrationTest {
    @Autowired
    private PersonRepository personRepository;
    private Person person1;

    @Before
    public void setUp() {
        person1 = new Person("IsGreat", "Jorge");
        personRepository.save(person1);
    }

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
                .body("lastName", hasItem("Sucks"));
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
