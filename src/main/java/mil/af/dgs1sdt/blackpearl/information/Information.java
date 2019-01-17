package mil.af.dgs1sdt.blackpearl.information;

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
public class Information {
  @Id
  @GeneratedValue
  private Long id;
  private String name;
  private String content;

  public Information(String name, String content) {
    this.name = name;
    this.content = content;
  }

  public Information update(InformationJSON json) {
    this.setId(json.getId());
    this.setName(json.getName());
    this.setContent(json.getContent());
    return this;
  }
}
