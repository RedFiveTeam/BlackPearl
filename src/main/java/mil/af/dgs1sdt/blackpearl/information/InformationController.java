package mil.af.dgs1sdt.blackpearl.information;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping(InformationController.URI)
public class InformationController {
  public static final String URI = "/api/information";

  @Autowired
  InformationRepository informationRepository;

  @GetMapping
  public @ResponseBody
  Iterable<Information> getInformation() {
    return informationRepository.findAll();
  }

  @PutMapping
  public @ResponseBody
  Iterable<Information> update(@Valid @RequestBody Iterable<InformationJSON> json) {
    List<Information> information = new ArrayList();
    json.forEach(item ->
      information.add(
        new Information(
          item.getId(),
          item.getName(),
          item.getContent()
        )));
    return this.informationRepository.saveAll(information);
  }
}
