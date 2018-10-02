package mil.af.dgs1sdt.blackpearl.resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(ResourceController.URI)
public class ResourceController {
    public static final String URI = "/api/resources";

    @Autowired ResourceRepository resourceRepository;

    @GetMapping
    public @ResponseBody Iterable<Resource> getAllResources() {
        return resourceRepository.findAll();
    }
}
