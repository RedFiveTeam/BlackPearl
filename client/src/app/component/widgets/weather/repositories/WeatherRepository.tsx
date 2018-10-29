import { WeatherModel } from '../WeatherModel';

export interface WeatherRepository {
  getWeather(): Promise<WeatherModel[]>;
  update(weather: WeatherModel[]): Promise<WeatherModel[]>;
}