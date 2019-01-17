package mil.af.dgs1sdt.blackpearl.resource.click;

import mil.af.dgs1sdt.blackpearl.resource.Resource;
import mil.af.dgs1sdt.blackpearl.resource.ResourceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.validation.Valid;
import java.time.Instant;

@Controller
@RequestMapping(ClickController.URI)
public class ClickController {
  public static final String URI = "/api/clicks";

  @Autowired
  ClickRepository clickRepository;

  @Autowired
  ResourceRepository resourceRepository;

  @GetMapping
  public @ResponseBody
  Iterable<Click> getRecentClicks() {
    Long range = (Instant.now().getEpochSecond() - 60 * 60 * 24 * 30) / 86400;
    return clickRepository.findAllByDayGreaterThanEqual(range);
  }

  @GetMapping(path = "/{resourceID}")
  public @ResponseBody
  Click update(@Valid @PathVariable Long resourceID) {
    Click click = clickRepository.getOneByResourceIDAndDay(resourceID, Instant.now().getEpochSecond() / 86400);

    Resource resource = resourceRepository.getOne(resourceID);

    if(resource != null) {
      resource.setClicked(Instant.now().getEpochSecond());
      resourceRepository.save(resource);
    }

    if (click == null) {
      click = new Click(resourceID, Instant.now().getEpochSecond() / 86400, 0L);
    }
    click.setClicks(click.getClicks()+1);
    return clickRepository.save(click);
  }
}