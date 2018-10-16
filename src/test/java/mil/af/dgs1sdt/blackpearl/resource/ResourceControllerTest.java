package mil.af.dgs1sdt.blackpearl.resource;

import com.fasterxml.jackson.core.JsonProcessingException;
import mil.af.dgs1sdt.blackpearl.BaseIntegrationTest;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;

public class ResourceControllerTest extends BaseIntegrationTest {
    @Autowired private ResourceRepository resourceRepository;
    private Resource resource1;
    private Resource resource2;
    private Resource resource3;
    private Resource resource4;


    @Before
    public void setUp() {
        resource1 = new Resource("Googerbhjwrle", "https://www.gowqeqweogle.com", 1L);
        resource2 = new Resource("Yahoo", "https://www.yahoo.com", 2L);
        resource3 = new Resource("eBay", "https://www.ebay.com", 3L);
        resource4 = new Resource("notGoogle", "https://www.notgoogle.com", 1L);

        resourceRepository.save(resource1);
        resourceRepository.save(resource2);
        resourceRepository.save(resource3);
        resourceRepository.save(resource4);
    }

    @After
    public void tearDown() {
        super.tearDown();
    }

    @Test
    public void getAllResourcesTest() {
        given()
                .port(port)
                .when()
                .get(ResourceController.URI)
                .then()
                .statusCode(200)
                .body("url.size()", equalTo(4))
                .body("[0].url", equalTo(resource1.getUrl()))
                .body("[1].url", equalTo(resource2.getUrl()))
                .body("[2].url", equalTo(resource3.getUrl()))
                .body("[3].url", equalTo(resource4.getUrl()));
    }

    @Test
    public void getAllResourcesByCategoryID() {
        given()
                .port(port)
                .when()
                .get(ResourceController.URI + "/1")
                .then()
                .statusCode(200)
                .body("url.size()", equalTo(2))
                .body("[0].url", equalTo(resource1.getUrl()))
                .body("[0].categoryID", equalTo(1))
                .body("[1].url", equalTo(resource4.getUrl()))
                .body("[1].categoryID", equalTo(1));
    }

    @Test
    public void addResourceTest() throws JsonProcessingException {
        ResourceJSON resource = new ResourceJSON();
        resource.setName("Test");
        resource.setUrl("https://www.test.com");
        resource.setCategoryID(1L);

        given()
                .port(port)
                .contentType("application/json")
                .body(resource)
                .when()
                .post(ResourceController.URI)
                .then()
                .statusCode(200)
                .body("url", equalTo("https://www.test.com"))
                .body("name", equalTo("Test"))
                .body("categoryID", equalTo(1));
    }

    @Test
    public void deleteTest() {
        given()
                .port(port)
                .contentType("application/json")
                .body(resource1.getId())
                .when()
                .delete(ResourceController.URI)
                .then()
                .statusCode(204);
    }

    @Test
    public void updateTest() throws Exception {
        resource4.setUrl("https://www.google.com");
        resource4.setName("Google");

        final String json = objectMapper.writeValueAsString(resource4);
        given()
          .port(port)
          .contentType("application/json")
          .body(json)
        .when()
          .put(ResourceController.URI + "/4")
        .then()
          .statusCode(200)
          .body("url", equalTo("https://www.google.com"));
    }
}