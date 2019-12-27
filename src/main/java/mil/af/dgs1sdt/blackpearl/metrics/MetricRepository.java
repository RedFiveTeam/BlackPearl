package mil.af.dgs1sdt.blackpearl.metrics;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MetricRepository extends JpaRepository<Metric, Long> {
  List<Metric> findTop50ByOrderByTimeDesc();
  long countByContext(String context);
  long countByAction(String action);

  @Query(
    value = "" +
      "select context, count(*) " +
      "from metric " +
      "where metric.action='CLICK_RESOURCE' and metric.context<>'Home' " +
      "group by metric.context " +
      "order by count(*) desc " +
      "limit 5",
    nativeQuery = true
  )
  List<Object[]> topResources();

  @Query(
    value = "" +
      "select metric.action, count(*) " +
      "from metric " +
      "where metric.action<>'CLICK_RESOURCE' and metric.action<>'VISIT' " +
      "group by metric.action " +
      "order by count(*) desc " +
      "limit 5",
    nativeQuery = true
  )
  List<Object[]> topActions();
}
