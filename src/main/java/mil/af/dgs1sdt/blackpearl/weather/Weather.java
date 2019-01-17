package mil.af.dgs1sdt.blackpearl.weather;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
public class Weather {
  @Id
  @GeneratedValue
  private Long id;
  private String url;
  private String label;

  public Weather(String url, String label) {
    this.url = url;
    this.label = label;
  }

  public Weather update(WeatherJSON json) {
    this.setId(json.getId());
    this.setUrl(json.getUrl());
    this.setLabel(json.getLabel());
    return this;
  }
}
