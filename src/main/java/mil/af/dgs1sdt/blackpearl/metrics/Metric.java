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

  @ManyToOne
  @JoinColumn(name = "userID")
  private Account account;

  private Date time;

  public Metric(Account account, Date time) {
    this.account = account;
    this.time = time;
  }
}
