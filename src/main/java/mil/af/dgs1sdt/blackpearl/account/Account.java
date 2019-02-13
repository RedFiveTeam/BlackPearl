package mil.af.dgs1sdt.blackpearl.account;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Transient;
import java.util.Collection;

@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "Account")
@Data
public class Account implements UserDetails {
  @Id
  @GeneratedValue
  private Long id;
  private String cardID;
  private Long role;
  private Long specialty;
  private Long sort;
  private Long widgets;

  @Transient
  private String password;

  public Account(
    String cardId,
    Long role,
    Long specialty,
    Long sort,
    Long widgets
  ) {
    this.cardID = cardId;
    this.role = role;
    this.specialty = specialty;
    this.sort = sort;
    this.widgets = widgets;
  }

  public Account update(AccountJSON json) {
    this.setId(json.getId());
    this.setCardID(json.getCardID());
    this.setRole(1L);  //What purpose does this serve?
    this.setSpecialty(json.getSpecialty());
    this.setSort(json.getSort());
    this.setWidgets(json.getWidgets());
    return this;
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return AuthorityUtils.createAuthorityList(role.toString());
  }

  @Override
  public String getPassword() {
    return this.password;
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return true;
  }

  @Override
  public String getUsername() {
    return "";
  }
}
