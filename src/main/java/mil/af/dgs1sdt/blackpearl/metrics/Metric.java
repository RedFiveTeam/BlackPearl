package mil.af.dgs1sdt.blackpearl.metrics;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import mil.af.dgs1sdt.blackpearl.account.Account;

import javax.persistence.*;
import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
public class Metric {
  @Id
  @GeneratedValue
  private Long id;

  private Long userID;

  private String cardID;

  private Date time;

  private String action;

  private String context;

  public Metric(Long userID, String cardID, Date time, String action, String context) {
    this.userID = userID;
    this.cardID = cardID;
    this.time = time;
    this.action = action;
    this.context = context;
  }
}
