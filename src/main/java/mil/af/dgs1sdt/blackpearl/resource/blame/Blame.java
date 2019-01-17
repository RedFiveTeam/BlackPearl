package mil.af.dgs1sdt.blackpearl.resource.blame;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
public class Blame {
  @Id
  @GeneratedValue
  private Long id;
  private String action;
  private String name;
  private String user;
  private Long time;

  public Blame(String action, String name, String user, Long time) {
    this.action = action;
    this.name = name;
    this.user = user;
    this.time = time;
  }
}
