package mil.af.dgs1sdt.blackpearl.time;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class TimeJSON {
    private Long timestamp;

    public TimeJSON(
            Long timestamp
    ) {
        this.timestamp = timestamp;
    }
}
