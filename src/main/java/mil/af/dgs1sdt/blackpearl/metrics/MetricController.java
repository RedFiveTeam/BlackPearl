package mil.af.dgs1sdt.blackpearl.metrics;

import mil.af.dgs1sdt.blackpearl.account.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping(MetricController.URI)
public class MetricController {
  public static final String URI = "/api/metrics";

  @Autowired
  MetricRepository metricRepository;

  @Autowired
  AccountRepository accountRepository;

  @PostMapping
  public @ResponseBody
  Metric create(@Valid @RequestBody MetricJSON metricJSON) {
    Long userID = 0000L;
    Metric metric = new Metric(
      userID,
      metricJSON.getCardID(),
      metricJSON.getTime(),
      metricJSON.getAction(),
      metricJSON.getContext()
    );
    return this.metricRepository.save(metric);
  }

  @GetMapping
  public @ResponseBody
  Iterable<Metric> getAllLogins() {
    return metricRepository.findAll();
  }

  @GetMapping("/visits")
  public @ResponseBody
  long getVisits() {
    return this.metricRepository.countByContext("Home");
  }

  @GetMapping("/users")
  public @ResponseBody
  long getUsers() {
    return this.accountRepository.count();
  }

  @GetMapping("/resource-clicks")
  public @ResponseBody
  long getResourceClicks() {
    return this.metricRepository.countByAction("CLICK_RESOURCE");
  }

  @GetMapping("/widget-uses")
  public @ResponseBody
  long getWidgetUses() {
    return (
      this.metricRepository.countByAction("CLICK_ACRONYM")
        + this.metricRepository.countByAction("CLICK_WEATHER")
        + this.metricRepository.countByAction("CLICK_COORD")
        + this.metricRepository.countByAction("CLICK_MEASUREMENT")
    );
  }

  @GetMapping("/top-resources")
  public @ResponseBody
  List<RankedMetric> getTopResources() {
    List<Object[]> recordSet = this.metricRepository.topResources();
    List<RankedMetric> topResources = new ArrayList<>();
    recordSet.forEach((record) -> {
      topResources.add(
        new RankedMetric(
          record[0].toString(),
          (BigInteger) record[1]
        )
      );
    });

    return topResources;
  }

  @GetMapping("/top-actions")
  public @ResponseBody
  List<RankedMetric> getTopActions() {
    List<Object[]> recordSet = this.metricRepository.topActions();
    List<RankedMetric> topActions = new ArrayList<>();
    recordSet.forEach((record) -> {
      topActions.add(
        new RankedMetric(
          record[0].toString(),
          (BigInteger) record[1]
        )
      );
    });

    return topActions;
  }

  @GetMapping("/latest-actions")
  public @ResponseBody
  List<Metric> getLatestActions() {
    return this.metricRepository.findTop50ByOrderByTimeDesc();
  }
}
