package mil.af.dgs1sdt.blackpearl.time;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TimeRepository extends JpaRepository<Timezone, Long> {
}
