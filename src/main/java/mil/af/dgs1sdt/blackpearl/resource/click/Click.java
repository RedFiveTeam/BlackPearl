package mil.af.dgs1sdt.blackpearl.resource.click;

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
public class Click {
  @Id
  @GeneratedValue
  private Long id;
  private Long resourceID;
  private Long day;
  private Long clicks;

  public Click(Long resourceID, Long day, Long clicks) {
    this.resourceID = resourceID;
    this.day = day;
    this.clicks = clicks;
  }
}
