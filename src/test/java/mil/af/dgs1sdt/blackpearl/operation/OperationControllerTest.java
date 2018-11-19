package mil.af.dgs1sdt.blackpearl.operation;

import com.fasterxml.jackson.core.JsonProcessingException;
import mil.af.dgs1sdt.blackpearl.BaseIntegrationTest;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;


public class OperationControllerTest extends BaseIntegrationTest {
  @Autowired private OperationRepository operationRepository;
  private Operation op1;
  private Operation op2;
  private Operation op3;
  private Operation op4;
  private Operation op5;

  @Before
  public void setUp() {
    op1 = new Operation(1L, "OP ONE", "This is Operation One", "https://www.opone.com");
    op2 = new Operation(2L, "OP TWO", "This is Operation Two", "https://www.optwo.com");
    op3 = new Operation(3L, "OP THREE", "This is Operation Three", "https://www.opthree.com");
    op4 = new Operation(4L, "OP FOUR", "This is Operation Four", "https://www.opfour.com");
    op5 = new Operation(5L, "OP FIVE", "This is Operation Five", "https://www.opfive.com");

    operationRepository.save(op1);
    operationRepository.save(op2);
    operationRepository.save(op3);
    operationRepository.save(op4);
    operationRepository.save(op5);
  }

  @After
  public void tearDown() { super.tearDown(); }

  @Test
  public void getAllOperationsTest() {
    given()
      .port(port)
      .when()
      .get(OperationController.URI)
      .then()
      .statusCode(200)
      .body("operation.size()", equalTo(5))
      .body("[0].title", equalTo(op1.getTitle()))
      .body("[0].description", equalTo(op1.getDescription()))
      .body("[0].address", equalTo(op1.getAddress()))
      .body("[4].title", equalTo(op5.getTitle()))
      .body("[4].description", equalTo(op5.getDescription()))
      .body("[4].address", equalTo(op5.getAddress()));
  }

  @Test
  public void addOperationTest() throws JsonProcessingException {
    OperationJSON op = new OperationJSON();
    op.setTitle("OP SIX");
    op.setDescription("This is Operation Six");
    op.setAddress("https://www.opsix.com");

    given()
      .port(port)
      .contentType("application/json")
      .body(op)
      .when()
      .post(OperationController.URI)
      .then()
      .statusCode(200)
      .body("title", equalTo("OP SIX"))
      .body("description", equalTo("This is Operation Six"))
      .body("address", equalTo("https://www.opsix.com"));
  }

}