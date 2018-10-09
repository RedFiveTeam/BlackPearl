package mil.af.dgs1sdt.blackpearl.resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Controller
@RequestMapping(ResourceController.URI)
public class ResourceController {
    public static final String URI = "/api/resources";

    @Autowired ResourceService resourceService;
    @Autowired ResourceRepository resourceRepository;

    @GetMapping
    public @ResponseBody
    Iterable<Resource> getAllResources() {
        return resourceRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<Resource> create(@Valid @RequestBody ResourceJSON resourceJSON) {
        Resource resource = new Resource(resourceJSON.getName(), resourceJSON.getUrl());
        return new ResponseEntity<>(this.resourceRepository.save(resource), HttpStatus.CREATED);
    }
}
