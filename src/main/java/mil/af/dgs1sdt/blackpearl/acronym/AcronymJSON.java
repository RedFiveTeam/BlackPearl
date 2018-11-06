package mil.af.dgs1sdt.blackpearl.acronym;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class AcronymJSON {
  private static final String emptyFieldMessage = "This is required";

  private Long id;

  @NotNull(message = emptyFieldMessage)
  private String acronym;

  @NotNull(message = emptyFieldMessage)
  private String definition;

  public AcronymJSON(String acronym, String definition) {
    this.acronym = acronym;
    this.definition = definition;
  }
}
