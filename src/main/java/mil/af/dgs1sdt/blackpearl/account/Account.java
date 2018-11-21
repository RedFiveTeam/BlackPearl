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
  private String name;
  private Long role;

  public Account(String cardId, String name, Long role) {
    this.cardID = cardId;
    this.name = name;
    this.role = role;
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return AuthorityUtils.createAuthorityList(role.toString());
  }

  @Override
  public String getPassword() { return ""; }

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
  public String getUsername() { return ""; }
}
