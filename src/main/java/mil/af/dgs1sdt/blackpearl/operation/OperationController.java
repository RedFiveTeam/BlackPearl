package mil.af.dgs1sdt.blackpearl.operation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

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
}
