package mil.af.dgs1sdt.blackpearl.metrics;

import mil.af.dgs1sdt.blackpearl.account.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;
import java.util.TimeZone;

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
    Long userID = accountRepository.findOneByCardID(metricJSON.getCardID()).getId();
    SimpleDateFormat sdf = new SimpleDateFormat("EEEE,MMMM d,yyyy h:mm,a", Locale.ENGLISH);
    sdf.setTimeZone(TimeZone.getTimeZone("UTC"));
    String formattedDate = sdf.format(metricJSON.getTime() * 1000);
    Date time = new Date(formattedDate);
    Metric metric = new Metric(userID, metricJSON.getCardID(), time, metricJSON.getAction(), metricJSON.getContext());
    return this.metricRepository.save(metric);
  }

  @GetMapping
  public @ResponseBody
  Iterable<Metric> getAllLogins() {
    return metricRepository.findAll();
  }
}
