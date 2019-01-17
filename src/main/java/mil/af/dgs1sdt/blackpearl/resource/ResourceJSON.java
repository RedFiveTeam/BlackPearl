package mil.af.dgs1sdt.blackpearl.resource;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ResourceJSON {
    private static final String emptyFieldMessage = "This is required";

    private Long id;

    @NotNull(message = emptyFieldMessage)
    private String name;

    @NotNull(message = emptyFieldMessage)
    private String url;

    @NotNull(message = emptyFieldMessage)
    private Long categoryID;

    private String accountID;

    private Long position;

    private Long clicked;

    public ResourceJSON(
      String name,
      String url,
      Long categoryID,
      String accountID,
      Long position
    ) {
      this.name = name;
      this.url = url;
      this.categoryID = categoryID;
      this.accountID = accountID;
      this.position = position;
    }
}
