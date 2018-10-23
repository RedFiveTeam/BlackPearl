package mil.af.dgs1sdt.blackpearl.time;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
public class Timezone {
    @Id
    @GeneratedValue
    private Long id;
    private int position;
    private String zone;
    private String name;

    public Timezone(int position, String zone, String name) {
        this.position = position;
        this.zone = zone;
        this.name = name;
    }
}
