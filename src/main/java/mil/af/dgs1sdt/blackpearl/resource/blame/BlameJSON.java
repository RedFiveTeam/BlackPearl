package mil.af.dgs1sdt.blackpearl.resource.blame;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class BlameJSON {

  private static final String emptyFieldMessage = "This is required";

  private Long id;

  @NotNull(message = emptyFieldMessage)
  private String action;

  @NotNull(message = emptyFieldMessage)
  private String name;

  @NotNull(message = emptyFieldMessage)
  private String user;

  @NotNull(message = emptyFieldMessage)
  private Long time;

  public BlameJSON(
    String action,
    String name,
    String user,
    Long time
  ) {
    this.action = action;
    this.name = name;
    this.user = user;
    this.time = time;
  }
}
