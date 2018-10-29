import { WeatherStore } from './WeatherStore';
import { Stores } from '../../../utils/Stores';
import { action } from 'mobx';
import { WeatherModel } from './WeatherModel';
import { WeatherRepository } from './repositories/WeatherRepository';
import { Repositories } from '../../../utils/Repositories';

export class WeatherActions {
  private weatherStore: WeatherStore;
  private weatherRepository: WeatherRepository;

  constructor(stores: Partial<Stores>, repositories: Partial<Repositories>) {
    this.weatherStore = stores.weatherStore!;
    this.weatherRepository = repositories.weatherRepository!;
  }

  @action.bound
  async getWeather() {
    this.weatherStore.setWeather(await this.weatherRepository.getWeather());
  }

  @action.bound
  setWeather(weather: WeatherModel[]) {
    this.weatherStore.setWeather(weather);
  }
}