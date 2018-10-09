package mil.af.dgs1sdt.blackpearl.resource;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
public class Resource {
    @Id
    @GeneratedValue
    private Long id;
    private String url;
    private String name;

    public Resource(String name, String url) {
        this.name = name;
        this.url = url;
    }
}
