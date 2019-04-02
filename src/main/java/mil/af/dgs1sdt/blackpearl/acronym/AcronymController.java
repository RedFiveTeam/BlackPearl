package mil.af.dgs1sdt.blackpearl.acronym;

import mil.af.dgs1sdt.blackpearl.resource.blame.Blame;
import mil.af.dgs1sdt.blackpearl.resource.blame.BlameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.Instant;

@Controller
@RequestMapping(AcronymController.URI)
public class AcronymController {
  public static final String URI = "/api/acronyms";

  @Autowired
  AcronymRepository acronymRepository;

  @Autowired
  BlameRepository blameRepository;

  @GetMapping
  public @ResponseBody
  Iterable<Acronym> getAllAcronyms() {
    return acronymRepository.findAll();
  }

  @PostMapping
  public @ResponseBody
  Acronym create(@Valid @RequestBody AcronymJSON acronymJSON) {
    Acronym acronym = new Acronym(acronymJSON.getAcronym(), acronymJSON.getDefinition());

    String user = "More people";
    if (user.equals("anonymousUser")) {
      user = "GUEST.GUEST.GUEST.0123456789";
    }
    Blame blame = new Blame(
      "ADD_ACRONYM",
      acronymJSON.getAcronym(),
      user,
      Instant.now().getEpochSecond()
    );

    this.blameRepository.save(blame);
    return this.acronymRepository.save(acronym);
  }

  @DeleteMapping
  public ResponseEntity<Void> deleteAcronym(@Valid @RequestBody String acronymID) {
    Long id = Long.valueOf(acronymID);
    Acronym acronym = acronymRepository.getOne(id);

    if (acronym != null) {
      acronymRepository.deleteById(id);

      String user = "even more people";
      if (user.equals("anonymousUser")) {
        user = "GUEST.GUEST.GUEST.0123456789";
      }
      Blame blame = new Blame(
        "DELETE_ACRONYM",
        acronym.getAcronym(),
        user,
        Instant.now().getEpochSecond()
      );

      this.blameRepository.save(blame);
    }
    return ResponseEntity.noContent().build();
  }

  @PutMapping
  public @ResponseBody
  Acronym updateAcronym(@Valid @RequestBody AcronymJSON json) {
    final Acronym acronym = acronymRepository.getOne(json.getId());
    return acronymRepository.save(acronym.update(json));
  }
}
