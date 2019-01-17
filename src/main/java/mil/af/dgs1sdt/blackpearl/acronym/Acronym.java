package mil.af.dgs1sdt.blackpearl.acronym;


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
public class Acronym {
    @Id
    @GeneratedValue
    private Long id;
    private String acronym;
    private String definition;

    public Acronym(String acronym, String definition) {
      this.acronym = acronym;
      this.definition = definition;
    }

    public Acronym update (AcronymJSON json) {
      this.setId(json.getId());
      this.setAcronym(json.getAcronym());
      this.setDefinition(json.getDefinition());
      return this;
    }
}
