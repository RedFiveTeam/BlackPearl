package mil.af.dgs1sdt.blackpearl.acronym;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Controller
@RequestMapping(AcronymController.URI)
public class AcronymController {
  public static final String URI = "/api/acronyms";

  @Autowired
  AcronymRepository acronymRepository;

  @GetMapping
  public @ResponseBody
  Iterable<Acronym> getAllAcronyms() {
    return acronymRepository.findAll();
  }

  @PostMapping
  public @ResponseBody
  Acronym create(@Valid @RequestBody AcronymJSON acronymJSON) {
    Acronym acronym = new Acronym(acronymJSON.getAcronym(), acronymJSON.getDefinition());
    return this.acronymRepository.save(acronym);
  }

  @DeleteMapping
  public ResponseEntity<Void> deleteAcronym(@Valid @RequestBody String acronymID) {
    Long id = Long.valueOf(acronymID);
    acronymRepository.deleteById(id);
    return ResponseEntity.noContent().build();
  }
}
