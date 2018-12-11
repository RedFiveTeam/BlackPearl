package mil.af.dgs1sdt.blackpearl.resource;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ResourceRepository extends JpaRepository<Resource, Long> {
  @Query("SELECT r FROM Resource r WHERE r.categoryID > 0 OR r.accountID = ?1 ORDER BY r.position")
  List<Resource> getAllResourcesByCategoryIDAndAccountID(String accountID);
  @Query("SELECT r from Resource r WHERE ((r.categoryID >= :categoryMin AND r.categoryID <= :categoryMax) OR (r.categoryID = 0 AND r.accountID = :accountID)) AND r.name LIKE %:name%")
  List<Resource> findAllForGo(@Param("name") String name, @Param("accountID") String accountID, @Param("categoryMin") Long categoryMin, @Param("categoryMax") Long categoryMax);
}
