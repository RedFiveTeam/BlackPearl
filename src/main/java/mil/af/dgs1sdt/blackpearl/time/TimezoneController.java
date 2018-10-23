package mil.af.dgs1sdt.blackpearl.time;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping(TimezoneController.URI)
public class TimezoneController {
  public static final String URI = "/api/timezones";

  @Autowired
  TimezoneRepository timezoneRepository;

  @GetMapping
  public @ResponseBody
  Iterable<Timezone> getTimezones() {
    return timezoneRepository.findAll();
  }

  @PutMapping
  public @ResponseBody
  Iterable<Timezone> update(@Valid @RequestBody Iterable<TimezoneJSON> json) {
    List<Timezone> timezones = new ArrayList();
    json.forEach(item ->
      timezones.add(
        new Timezone(
          item.getId(),
          item.getPosition(),
          item.getZone(),
          item.getName()
        )));
    return this.timezoneRepository.saveAll(timezones);
  }
}
