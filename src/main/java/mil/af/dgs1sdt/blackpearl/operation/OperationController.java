package mil.af.dgs1sdt.blackpearl.operation;

import mil.af.dgs1sdt.blackpearl.resource.blame.Blame;
import mil.af.dgs1sdt.blackpearl.resource.blame.BlameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.Instant;

@Controller
@RequestMapping(OperationController.URI)
public class OperationController {
  public static final String URI = "/api/operations";

  @Autowired
  OperationRepository operationRepository;

  @Autowired
  BlameRepository blameRepository;

  @GetMapping
  public @ResponseBody
  Iterable<Operation> getAllOperations() {
    return operationRepository.findAll();
  }

  @PostMapping
  public @ResponseBody
  Operation create(@Valid @RequestBody OperationJSON operationJSON) {
    Operation operation = new Operation(
      operationJSON.getTitle(),
      operationJSON.getDescription(),
      operationJSON.getAddress()
    );

    String user = "Test User";
    if (user.equals("anonymousUser")) {
      user = "GUEST.GUEST.GUEST.0123456789";
    }
    Blame blame = new Blame(
      "ADD_OP",
      operationJSON.getTitle(),
      user,
      Instant.now().getEpochSecond()
    );

    this.blameRepository.save(blame);

    return this.operationRepository.save(operation);
  }

  @PutMapping(path = "/{id}")
  public @ResponseBody
  Operation update(@Valid @RequestBody OperationJSON json) {
    final Operation operation = operationRepository.getOne(json.getId());

    String oldName = operation.getTitle().substring(0, Math.min(operation.getTitle().length(), 15));
    if (!oldName.equals(operation.getTitle())) {
      oldName = oldName + "...";
    }

    String newName = json.getTitle().substring(0, Math.min(json.getTitle().length(), 15));
    if (!newName.equals(json.getTitle())) {
      newName = newName + "...";
    }

    String blameName = oldName + " (Now: " + newName + ")";

    if (operation.getTitle().equals(json.getTitle())) {
      blameName = json.getTitle();
    }

    String user = "Another TEst User";
    if (user.equals("anonymousUser")) {
      user = "GUEST.GUEST.GUEST.0123456789";
    }
    Blame blame = new Blame(
      "EDIT_OP",
      blameName,
      user,
      Instant.now().getEpochSecond()
    );

    this.blameRepository.save(blame);

    return operationRepository.save(operation.update(json));
  }

  @DeleteMapping
  public ResponseEntity<Void> delete(@Valid @RequestBody String operationId) {
    Long id = Long.valueOf(operationId);
    Operation op = operationRepository.getOne(id);

    String user = "More Test Users";
    if (user.equals("anonymousUser")) {
      user = "GUEST.GUEST.GUEST.0123456789";
    }
    if (op != null) {
      Blame blame = new Blame(
        "DELETE_OP",
        op.getTitle(),
        user,
        Instant.now().getEpochSecond()
      );

      this.blameRepository.save(blame);
      operationRepository.deleteById(id);
    }
    return ResponseEntity.noContent().build();
  }
}
