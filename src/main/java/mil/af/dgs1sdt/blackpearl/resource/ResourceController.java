package mil.af.dgs1sdt.blackpearl.resource;

import mil.af.dgs1sdt.blackpearl.resource.blame.Blame;
import mil.af.dgs1sdt.blackpearl.resource.blame.BlameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping(ResourceController.URI)
public class ResourceController {
  public static final String URI = "/api/resources";

  @Autowired
  ResourceRepository resourceRepository;

  @Autowired
  BlameRepository blameRepository;

  @GetMapping
  public @ResponseBody
  Iterable<Resource> getAllResources() {
    return resourceRepository.findAll();
  }

  @GetMapping(path = "/{accountID}")
  public @ResponseBody
  Iterable<Resource> getAllResourcesAccount(@PathVariable String accountID) {
    return resourceRepository.getAllResourcesByCategoryIDAndAccountID(accountID);
  }

  @PostMapping
  public @ResponseBody
  Resource create(@Valid @RequestBody ResourceJSON resourceJSON) {
    Resource resource = new Resource(
      resourceJSON.getName(),
      resourceJSON.getUrl(),
      resourceJSON.getCategoryID(),
      resourceJSON.getAccountID(),
      resourceJSON.getPosition()
    );

    Blame blame = new Blame(
      "ADD",
      resourceJSON.getName(),
      resourceJSON.getAccountID(),
      Instant.now().getEpochSecond()
    );

    this.blameRepository.save(blame);

    return this.resourceRepository.save(resource);
  }

  @DeleteMapping
  public ResponseEntity<Void> delete(@Valid @RequestBody String resourceId) {
    Long id = Long.valueOf(resourceId);
    Resource resource = resourceRepository.getOne(id);

    Blame blame = new Blame(
      "DELETE",
      resource.getName(),
      SecurityContextHolder.getContext().getAuthentication().getName(),
      Instant.now().getEpochSecond()
    );

    this.blameRepository.save(blame);
    resourceRepository.deleteById(id);
    return ResponseEntity.noContent().build();
  }

  @PutMapping(path = "/{id}")
  public @ResponseBody
  Resource update(@Valid @RequestBody ResourceJSON json) {
    final Resource resource = resourceRepository.getOne(json.getId());

    String oldName = resource.getName().substring(0, Math.min(resource.getName().length(), 10));
    if (!oldName.equals(resource.getName())) {
      oldName = oldName + "...";
    }

    String newName = json.getName().substring(0, Math.min(json.getName().length(), 10));
    if (!newName.equals(json.getName())) {
      newName = newName + "...";
    }

    String blameName = oldName + " (Now: " + newName + ")";

    if (resource.getName().equals(json.getName())) {
      blameName = json.getName();
    }

    Blame blame = new Blame(
      "EDIT",
      blameName,
      json.getAccountID(),
      Instant.now().getEpochSecond()
    );

    blameRepository.save(blame);
    return resourceRepository.save(resource.update(json));
  }

  @PutMapping
  public @ResponseBody
  Iterable<Resource> updatePassed(@Valid @RequestBody Iterable<ResourceJSON> json) {
    List<Resource> resources = new ArrayList();
    json.forEach(item -> {
      resources.add(
        new Resource(
          item.getId(),
          item.getUrl(),
          item.getName(),
          item.getCategoryID(),
          item.getAccountID(),
          item.getPosition()
        )
      );
    });
    return this.resourceRepository.saveAll(resources);
  }
}
