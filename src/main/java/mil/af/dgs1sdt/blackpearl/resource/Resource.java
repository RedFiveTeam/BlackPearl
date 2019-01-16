package mil.af.dgs1sdt.blackpearl.resource;

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
public class Resource {
    @Id
    @GeneratedValue
    private Long id;
    private String url;
    private String name;
    private Long categoryID;
    private String accountID;
    private Long position;
    private Long clicked;

    public Resource(String name, String url, Long categoryID, String accountID, Long position, Long clicked) {
      this.name = name;
      this.url = url;
      this.categoryID = categoryID;
      this.accountID = accountID;
      this.position = position;
      this.clicked = clicked;
    }

    public Resource update(ResourceJSON json) {
        this.setId(json.getId());
        this.setName(json.getName());
        this.setUrl(json.getUrl());
        this.setAccountID(json.getAccountID());
        this.setPosition(json.getPosition());
        this.setClicked(json.getClicked());
        return this;
    }
}
