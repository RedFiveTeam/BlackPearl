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

  public Weather(String url) {
    this.url = url;
  }

  public Weather update(WeatherJSON json) {
    this.setId(json.getId());
    this.setUrl(json.getUrl());
    return this;
  }

  public static Weather fromJSON(WeatherJSON json) {
    return new Weather(
      json.getId(),
      json.getUrl()
    );
  }
}
