package mil.af.dgs1sdt.blackpearl.metrics;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class MetricJSON {

  private Long id;
  private String cardID;
  private Long time;
  private String action;
  private String context;

  public MetricJSON(String cardID, Long time, String action, String context) {
    this.cardID = cardID;
    this.time = time;
    this.action = action;
    this.context = context;
  }
}
