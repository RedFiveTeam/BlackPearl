package mil.af.dgs1sdt.blackpearl.metrics;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
public class Login {
  @Id
  @GeneratedValue
  private Long id;
  private Long userID;
  private Date time;

  public Login(Long userId, Date time) {
    this.userID = userId;
    this.time = time;
  }
}
