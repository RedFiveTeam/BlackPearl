package mil.af.dgs1sdt.blackpearl.account;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class AccountJSON {
  private static final String emptyFieldMessage = "This is required";

  private Long id;

  @NotNull(message = emptyFieldMessage)
  private String cardID;

  @NotNull(message = emptyFieldMessage)
  private String name;

  private Long role;

  @NotNull(message = emptyFieldMessage)
  private Long specialty;

  public AccountJSON(String cardID, String name, Long role, Long specialty) {
    this.cardID = cardID;
    this.name = name;
    this.role = role;
    this.specialty = specialty;
  }
}
