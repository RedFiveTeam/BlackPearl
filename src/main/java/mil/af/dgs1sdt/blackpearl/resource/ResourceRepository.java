package mil.af.dgs1sdt.blackpearl.resource;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ResourceRepository extends JpaRepository<Resource, Long> {
  @Query("SELECT r FROM Resource r WHERE r.categoryID > 0 OR r.accountID = ?1 ORDER BY r.position")
  List<Resource> getAllResourcesByCategoryIDAndAccountID(String accountID);
}
