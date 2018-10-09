package mil.af.dgs1sdt.blackpearl.resource;

import com.fasterxml.jackson.core.JsonProcessingException;
import mil.af.dgs1sdt.blackpearl.BaseIntegrationTest;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;

public class ResourceControllerTest extends BaseIntegrationTest {
    @Autowired
    private ResourceRepository resourceRepository;
    private Resource resource1;
    private Resource resource2;
    private Resource resource3;

    @Before
    public void setUp() {
        resource1 = new Resource("Googerbhjwrle", "https://www.gowqeqweogle.com");
        resource2 = new Resource("Yahoo", "https://www.yahoo.com");
        resource3 = new Resource("eBay", "https://www.ebay.com");

        resourceRepository.save(resource1);
        resourceRepository.save(resource2);
        resourceRepository.save(resource3);
    }

    @Test
    public void getAllResourcesTest() {
        given()
                .port(port)
                .when()
                .log().all()
                .get(ResourceController.URI)
                .then()
                .statusCode(200)
                .body("url.size()", equalTo(3))
                .body("[0].url", equalTo(resource1.getUrl()))
                .body("[1].url", equalTo(resource2.getUrl()))
                .body("[2].url", equalTo(resource3.getUrl()));
    }

    @Test
    public void addResourceTest() throws JsonProcessingException {
        ResourceJSON resource = new ResourceJSON();
        resource.setName("Test");
        resource.setUrl("https://www.test.com");

        given()
                .port(port)
                .log().all()
                .contentType("application/json")
                .body(resource)
                .when()
                .post(ResourceController.URI)
                .then()
                .statusCode(201)
                .body("url", equalTo("https://www.test.com"))
                .body("name", equalTo("Test"));

//        given()
//                .port(port)
//                .when()
//                .log().all()
//                .get(ResourceController.URI)
//                .then()
//                .statusCode(200)
//                .body("url", equalTo(4));4
    }
}