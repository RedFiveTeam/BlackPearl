package mil.af.dgs1sdt.blackpearl.time;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class TimeJSON {
    private Long timestamp;

    private Iterable<Timezone> zones;

    public TimeJSON(
            Long timestamp,
            Iterable<Timezone> zones
    ) {
        this.timestamp = timestamp;
        this.zones = zones;
    }
}
