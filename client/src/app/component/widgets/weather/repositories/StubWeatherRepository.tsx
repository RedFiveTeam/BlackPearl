import { WeatherModel } from '../WeatherModel';
import { WeatherRepository } from './WeatherRepository';

export class StubWeatherRepository implements WeatherRepository {
  getWeather(): Promise<WeatherModel[]> {
    return Promise.resolve(
      [new WeatherModel(
        1,
        'https://www.weather.com',
        'USA'
      )]
    );
  }

  update(weather: WeatherModel[]): Promise<WeatherModel[]> {
    return Promise.resolve(weather);
  }
}