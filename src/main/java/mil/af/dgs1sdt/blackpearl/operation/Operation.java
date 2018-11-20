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
  private String address;

  public Operation(String title, String description, String address) {
    this.title = title;
    this.description = description;
    this.address = address;
  }

  public Operation update(OperationJSON json) {
    this.setId(json.getId());
    this.setTitle(json.getTitle());
    this.setDescription(json.getDescription());
    this.setAddress(json.getAddress());
    return this;
  }
}
