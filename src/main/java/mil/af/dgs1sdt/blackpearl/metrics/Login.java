package mil.af.dgs1sdt.blackpearl.metrics;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import mil.af.dgs1sdt.blackpearl.account.Account;

import javax.persistence.*;
import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "Login")
@Data
@Table(name = "login")
public class Login {
  @Id
  @GeneratedValue
  private Long id;

  @ManyToOne
  @JoinColumn(name = "userID")
  private Account account;

  private Date time;

  public Login(Account account, Date time) {
    this.account = account;
    this.time = time;
  }
}
