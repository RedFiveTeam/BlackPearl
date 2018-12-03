package mil.af.dgs1sdt.blackpearl.metrics;

import mil.af.dgs1sdt.blackpearl.account.Account;
import mil.af.dgs1sdt.blackpearl.account.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.xml.bind.DatatypeConverter;
import java.util.Date;

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
    Account account = accountRepository.findOneByCardID(metricJSON.getCardId());
    Date time = DatatypeConverter.parseDateTime(metricJSON.getTime()).getTime();
    Metric metric = new Metric(account, time);
    return this.metricRepository.save(metric);
  }

  @GetMapping
  public @ResponseBody
  Iterable<Metric> getAllLogins() {
    return metricRepository.findAll();
  }
}
