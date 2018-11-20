package mil.af.dgs1sdt.blackpearl.resource.blame;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BlameRepository extends JpaRepository<Blame, Long> {
  Iterable<Blame> findAllByOrderByTimeDesc();
}
