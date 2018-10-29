package mil.af.dgs1sdt.blackpearl.weather;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@NoArgsConstructor
@Data
public class WeatherJSON {
  private static final String emptyFieldMessage = "This is required";

  private Long id;

  @NotNull(message = emptyFieldMessage)
  private String url;

  public WeatherJSON(String url) {
    this.url = url;
  }
}
