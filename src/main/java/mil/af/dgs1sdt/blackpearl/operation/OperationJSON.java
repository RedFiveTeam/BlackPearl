package mil.af.dgs1sdt.blackpearl.operation;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class OperationJSON {
  private static final String emptyFieldMessage = "This is required";

  private Long id;

  @NotNull(message = emptyFieldMessage)
  private String title;

  @NotNull(message = emptyFieldMessage)
  private String description;

  public OperationJSON(String title, String description) {
    this.title = title;
    this.description = description;
  }
}
