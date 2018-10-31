package mil.af.dgs1sdt.blackpearl.weather;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping(WeatherController.URI)
public class WeatherController {
  public static final String URI = "/api/weather";

  @Autowired
  WeatherRepository weatherRepository;

  @GetMapping
  public @ResponseBody
  Iterable<Weather> getWeather() {
    return weatherRepository.findAll();
  }

  @PutMapping
  public @ResponseBody
  Iterable<Weather> update(@Valid @RequestBody Iterable<WeatherJSON> json) {
    List<Weather> weather = new ArrayList();
    json.forEach(item ->
      weather.add(
        new Weather(
          item.getId(),
          item.getUrl(),
          item.getLabel()
        )));
    return this.weatherRepository.saveAll(weather);
  }
}
