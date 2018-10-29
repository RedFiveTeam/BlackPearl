package mil.af.dgs1sdt.blackpearl.weather;

import mil.af.dgs1sdt.blackpearl.BaseIntegrationTest;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;

public class WeatherControllerTest extends BaseIntegrationTest {
  @Autowired WeatherRepository weatherRepository;
  private Weather weather;

  @Before
  public void setUp() {
    weather = new Weather("https://weather.com");

    weatherRepository.save(weather);
  }

  @After
  public void tearDown() {
    super.tearDown();
  }

  @Test
  public void getWeatherTest() {
    given()
      .port(port)
      .when()
      .get(WeatherController.URI)
      .then()
      .statusCode(200)
      .body("[0].url", equalTo("https://weather.com"));
  }

  @Test
  public void updateWeatherTest() throws Exception {
    weather.setUrl("https://notWeather.com");

    Weather[] w = {weather};

    final String json = objectMapper.writeValueAsString(w);
    given()
      .port(port)
      .contentType("application/json")
      .body(json)
      .when()
      .put(WeatherController.URI)
      .then()
      .statusCode(200)
      .body("[0].url", equalTo("https://notWeather.com"));
  }
}
