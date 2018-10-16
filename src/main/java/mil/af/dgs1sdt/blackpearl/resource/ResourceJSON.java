package mil.af.dgs1sdt.blackpearl.resource;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

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

    public ResourceJSON(
            String name,
            String url,
            Long categoryID
    ) {
        this.name = name;
        this.url = url;
        this.categoryID = categoryID;
    }
}
