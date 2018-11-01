import { action } from 'mobx';
import { WeatherStore } from '../WeatherStore';
import { WeatherRepository } from '../repositories/WeatherRepository';
import { Stores } from '../../../../utils/Stores';
import { Repositories } from '../../../../utils/Repositories';
import { WeatherModel } from '../WeatherModel';

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