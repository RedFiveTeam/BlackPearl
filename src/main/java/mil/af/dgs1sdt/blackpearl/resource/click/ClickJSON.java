package mil.af.dgs1sdt.blackpearl.resource.click;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ClickJSON {
  private static final String emptyFieldMessage = "This is required";

  private Long id;

  @NotNull(message = emptyFieldMessage)
  private Long resourceID;

  @NotNull(message = emptyFieldMessage)
  private Long day;

  @NotNull(message = emptyFieldMessage)
  private Long clicks;

  public ClickJSON(
    Long resourceID,
    Long day,
    Long clicks
  ) {
    this.resourceID = resourceID;
    this.day = day;
    this.clicks = clicks;
  }
}
