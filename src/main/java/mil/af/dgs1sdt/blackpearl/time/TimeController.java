package mil.af.dgs1sdt.blackpearl.time;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.time.Instant;

@Controller
@RequestMapping(TimeController.URI)
public class TimeController {
  public static final String URI = "/api/time";

  @Autowired
  TimeRepository timeRepository;

  @GetMapping
  public @ResponseBody
  TimeJSON getTime() {
    return new TimeJSON(
      Instant.now().getEpochSecond(),
      timeRepository.findAll()
    );
  }
}
