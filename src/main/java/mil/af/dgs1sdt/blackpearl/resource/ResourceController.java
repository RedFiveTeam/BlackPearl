package mil.af.dgs1sdt.blackpearl.resource;

import mil.af.dgs1sdt.blackpearl.account.Account;
import mil.af.dgs1sdt.blackpearl.account.AccountRepository;
import mil.af.dgs1sdt.blackpearl.resource.blame.Blame;
import mil.af.dgs1sdt.blackpearl.resource.blame.BlameRepository;
import mil.af.dgs1sdt.blackpearl.resource.click.ClickRepository;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

@Controller
@RequestMapping(ResourceController.URI)
public class ResourceController {
  public static final String URI = "/api/resources";

  @Autowired
  ResourceRepository resourceRepository;

  @Autowired
  ClickRepository clickRepository;

  @Autowired
  BlameRepository blameRepository;

  @Autowired
  AccountRepository accountRepository;

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
      resourceJSON.getPosition(),
      Instant.now().getEpochSecond()
    );

    if (resource.getCategoryID() != 0) {
      Blame blame = new Blame(
        "ADD",
        resourceJSON.getName(),
        resourceJSON.getAccountID(),
        Instant.now().getEpochSecond()
      );

      this.blameRepository.save(blame);
    }

    return this.resourceRepository.save(resource);
  }

  @RequestMapping(path = "/go")
  public @ResponseBody
  RedirectView goFunction(@RequestParam("q") String query,
                          @CookieValue(value = "account", defaultValue = "") String accountCookie) {
    Base64 base64 = new Base64();
    String username = new String(base64.decode(accountCookie.getBytes()));

    String url = "/";

    if (!accountCookie.equals("")) {
      Account account = accountRepository.findAccountByAltID(username);

      if (account != null ) {
        Long max = account.getSpecialty() * 3;

        List<Resource> resources = resourceRepository.findAllForGo(query, account.getCardID(), max - 2, max);
        int search = 0;
        if (resources.size() > 1) {
          search = 1;
        }
        url = "/?search=" + search + "&specialty=" + (max / 3) + "&q=" + query;
        if (resources.size() == 1) {
          url = resources.get(0).getUrl();
        }
      }

    }

    return new RedirectView(url);
  }


  @DeleteMapping
  public ResponseEntity<Void> delete(@Valid @RequestBody String resourceId) {
    Long id = Long.valueOf(resourceId);
    Resource resource = resourceRepository.getOne(id);


    if (resource != null) {
      if (resource.getCategoryID() != 0) {

        Blame blame = new Blame(
          "DELETE",
          resource.getName(),
          "TEST",
          Instant.now().getEpochSecond()
        );

        this.blameRepository.save(blame);
      }
      this.clickRepository.getAllByResourceID(id).forEach((r) -> this.clickRepository.deleteById(r.getId()));
      resourceRepository.deleteById(id);
    }

    return ResponseEntity.noContent().build();
  }

  @PutMapping(path = "/{id}")
  public @ResponseBody
  Resource update(@Valid @RequestBody ResourceJSON json) {
    final Resource resource = resourceRepository.getOne(json.getId());

    if (resource.getCategoryID() != 0) {

      String oldName = resource.getName().substring(0, Math.min(resource.getName().length(), 15));
      if (!oldName.equals(resource.getName())) {
        oldName = oldName + "...";
      }

      String newName = json.getName().substring(0, Math.min(json.getName().length(), 15));
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
    }
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
          item.getPosition(),
          item.getClicked()
        )
      );
    });
    return this.resourceRepository.saveAll(resources);
  }

  @EventListener(ApplicationReadyEvent.class)
  public void deleteOldResources() {
    Runnable helloRunnable = new Runnable() {

      public void run() {
        Iterable<Resource> resources = resourceRepository.findAll();
        for (Resource r : resources) {
          Long now = Instant.now().getEpochSecond();
          if (r.getCategoryID() != 0 && r.getClicked() != null && (now - r.getClicked()) > 60 * 60 * 24 * 90) {
            resourceRepository.deleteById(r.getId());
            Blame blame = new Blame(
              "DELETE",
              r.getName(),
              "AUTO DELETE",
              Instant.now().getEpochSecond()
            );
            blameRepository.save(blame);
          }
        }
      }
    };
    ScheduledExecutorService executor = Executors.newScheduledThreadPool(1);
    executor.scheduleAtFixedRate(helloRunnable, 0, 1, TimeUnit.DAYS);
  }
}
