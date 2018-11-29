package mil.af.dgs1sdt.blackpearl.resource.blame;

import org.springframework.data.jpa.repository.JpaRepository;

public interface BlameRepository extends JpaRepository<Blame, Long> {
  Iterable<Blame> findAllByTimeGreaterThanEqualOrderByTimeDesc(Long time);
}
