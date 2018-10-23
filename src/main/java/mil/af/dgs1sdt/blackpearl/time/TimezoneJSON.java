package mil.af.dgs1sdt.blackpearl.time;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@NoArgsConstructor
@Data
public class TimezoneJSON {
    private static final String emptyFieldMessage = "This is required";

    private Long id;

    @NotNull(message = emptyFieldMessage)
    private int position;

    @NotNull(message = emptyFieldMessage)
    private String zone;

    @NotNull(message = emptyFieldMessage)
    private String name;
}
