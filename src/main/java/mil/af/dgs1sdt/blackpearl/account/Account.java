package mil.af.dgs1sdt.blackpearl.account;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Transient;

@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "Account")
@Data
public class Account {
  @Id
  @GeneratedValue
  private Long id;
  private String altID;
  private String cardID;
  private Long role;
  private Long specialty;
  private Long sort;
  private Long widgets;

  @Transient
  private String password;

  public Account(
    String cardId,
    String altID,
    Long role,
    Long specialty,
    Long sort,
    Long widgets
  ) {
    this.cardID = cardId;
    this.altID = altID;
    this.role = role;
    this.specialty = specialty;
    this.sort = sort;
    this.widgets = widgets;
  }

  public Account update(AccountJSON json) {
    this.setId(json.getId());
    this.setCardID(json.getCardID());
    this.setAltID(json.getAltID());
    this.setRole(1L);  //What purpose does this serve?
    this.setSpecialty(json.getSpecialty());
    this.setSort(json.getSort());
    this.setWidgets(json.getWidgets());
    return this;
  }

  public String getPassword() {
    return this.password;
  }

  public boolean isAccountNonExpired() {
    return true;
  }

  public boolean isAccountNonLocked() {
    return true;
  }

  public boolean isCredentialsNonExpired() {
    return true;
  }

  public boolean isEnabled() {
    return true;
  }

  public String getUsername() {
    return "";
  }
}
