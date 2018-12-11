package mil.af.dgs1sdt.blackpearl.metrics;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MetricRepository extends JpaRepository<Metric, Long> {
}
