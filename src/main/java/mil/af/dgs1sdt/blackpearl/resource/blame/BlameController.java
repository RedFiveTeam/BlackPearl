package mil.af.dgs1sdt.blackpearl.resource.blame;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(BlameController.URI)
public class BlameController {

  public static final String URI = "/api/blame";

  @Autowired
  BlameRepository blameRepository;

  @GetMapping
  public @ResponseBody
  Iterable<Blame> getAllBlame() { return blameRepository.findAllByOrderByTimeDesc(); }
}
