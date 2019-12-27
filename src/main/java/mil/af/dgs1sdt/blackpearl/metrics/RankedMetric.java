package mil.af.dgs1sdt.blackpearl.metrics;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigInteger;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RankedMetric {
  private String name;
  private BigInteger clicks;
}
