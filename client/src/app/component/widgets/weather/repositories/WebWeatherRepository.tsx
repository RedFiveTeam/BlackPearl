import { HTTPClient } from '../../../../utils/HTTPClient';
import { WeatherModel } from '../WeatherModel';
import { WeatherRepository } from './WeatherRepository';
import { WeatherSerializer } from '../serializer/WeatherSerializer';

export class WebWeatherRepository implements WeatherRepository {
  private weatherSerializer = new WeatherSerializer();

  constructor(private client: HTTPClient) {
  }

  async getWeather(): Promise<WeatherModel[]> {
    const json = await this.client.getJSON('/api/weather');
    return json.map((obj: any) => {
      return this.weatherSerializer.deserialize(obj);
    });
  }

  async update(weather: WeatherModel[]): Promise<WeatherModel[]> {
    const json = await this.client.putJSON(
      '/api/weather',
      JSON.stringify(weather.map((w) =>
        this.weatherSerializer.serialize(w))
      ));
    return json.map((obj: any) => {
      return this.weatherSerializer.deserialize(obj);
    });
  }
}