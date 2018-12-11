package mil.af.dgs1sdt.blackpearl.resource.click;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ClickRepository extends JpaRepository<Click, Long> {
  Iterable<Click> findAllByDayGreaterThanEqual(Long range);
  Click getOneByResourceIDAndDay(Long resourceID, Long day);
  Iterable<Click> getAllByResourceID(Long id);
}
