package mil.af.dgs1sdt.blackpearl.account;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountRepository extends JpaRepository<Account, Long>{
  Account findAccountById(Long id);
  Account findOneByCardID(String cardId);
  Account findAccountByAltID(String altId);
}
