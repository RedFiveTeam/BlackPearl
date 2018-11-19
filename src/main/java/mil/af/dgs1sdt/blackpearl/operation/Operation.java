package mil.af.dgs1sdt.blackpearl.operation;

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
public class Operation {
  @Id
  @GeneratedValue
  private Long id;
  private String title;
  private String description;

  public Operation(String title, String description) {
    this.title = title;
    this.description = description;
  }
}
