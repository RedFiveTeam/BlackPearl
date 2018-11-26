package mil.af.dgs1sdt.blackpearl.resource.blame;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.time.Instant;

@Controller
@RequestMapping(BlameController.URI)
public class BlameController {

  public static final String URI = "/api/blame";

  @Autowired
  BlameRepository blameRepository;

  @GetMapping
  public @ResponseBody
  Iterable<Blame> getAllBlame() {
    Long range = Instant.now().getEpochSecond() - 60 * 60 * 24 * 30;
    return blameRepository.findAllByTimeGreaterThanEqualOrderByTimeDesc(range);
  }
}
