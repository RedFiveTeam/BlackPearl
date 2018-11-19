package mil.af.dgs1sdt.blackpearl.operation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Controller
@RequestMapping(OperationController.URI)
public class OperationController {
  public static final String URI = "/api/operations";

  @Autowired
  OperationRepository operationRepository;

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
    return this.operationRepository.save(operation);
  }
}
