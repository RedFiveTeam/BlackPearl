package mil.af.dgs1sdt.blackpearl.account;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Value;

import javax.validation.constraints.NotNull;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class AccountJSON {
  private static final String emptyFieldMessage = "This is required";

  private Long id;

  @NotNull(message = emptyFieldMessage)
  private String cardID;
  private String altID;
  private Long role;
  private Long specialty;
  private Long sort;
  private Long widgets;
  private String classification;

  public AccountJSON(String cardID, String altID, Long role, Long specialty, Long sort, Long widgets, String classification) {
    this.cardID = cardID;
    this.altID = altID;
    this.role = role;
    this.specialty = specialty;
    this.sort = sort;
    this.widgets = widgets;
    this.classification = classification;
  }
}
