package mil.af.dgs1sdt.blackpearl.classification;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(ClassificationController.URI)
public class ClassificationController {
  public static final String URI = "/api/classification";

  @Value("${CLASSIFIED}") private String classification;

  @GetMapping
  @ResponseBody
  public ClassificationModel getClassification() { return new ClassificationModel(this.classification);
  }
}