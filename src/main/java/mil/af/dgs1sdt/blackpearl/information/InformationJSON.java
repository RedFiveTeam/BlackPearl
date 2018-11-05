package mil.af.dgs1sdt.blackpearl.information;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@NoArgsConstructor
@Data
public class InformationJSON {
  private static final String emptyMessage = "This is required";

  private Long id;

  @NotNull(message = emptyMessage)
  private String name;

  @NotNull(message = emptyMessage)
  private String content;

  public InformationJSON(String name, String content) {
    this.name = name;
    this.content = content;
  }
}
