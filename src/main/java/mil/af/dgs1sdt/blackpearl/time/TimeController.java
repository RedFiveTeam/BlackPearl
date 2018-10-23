package mil.af.dgs1sdt.blackpearl.time;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import java.time.Instant;

@Controller
@RequestMapping(TimeController.URI)
public class TimeController {
    public static final String URI = "/api/time";

    @GetMapping
    public @ResponseBody TimeJSON getTime() {
        return new TimeJSON(Instant.now().getEpochSecond());
    }

}
