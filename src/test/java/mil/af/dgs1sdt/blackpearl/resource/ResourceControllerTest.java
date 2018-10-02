package mil.af.dgs1sdt.blackpearl.resource;

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
        resource1 = new Resource(1, "https://www.gowqeqweogle.com", "Googerbhjwrle");
        resource2 = new Resource(2, "https://www.yahoo.com", "Yahoo");
        resource3 = new Resource(3, "https://www.ebay.com", "eBay");

        resourceRepository.save(resource1);
        resourceRepository.save(resource2);
        resourceRepository.save(resource3);
    }

    @Test
    public void getAllResourcesTest() {
        given()
                .port(port)
                .when()
                .get(ResourceController.URI)
                .then()
                .statusCode(200)
                .body("url.size()", equalTo(3))
                .body("[0].url", equalTo(resource1.getUrl()))
                .body("[1].url", equalTo(resource2.getUrl()))
                .body("[2].url", equalTo(resource3.getUrl()));
    }

}