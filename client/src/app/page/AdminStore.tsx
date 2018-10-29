import { action, computed, observable } from 'mobx';
import { TimezoneModel } from '../utils/time/TimezoneModel';
import { TimeRepository } from '../utils/time/repositories/TimeRepository';
import { WeatherRepository } from '../component/widgets/weather/repositories/WeatherRepository';
import { WeatherModel } from '../component/widgets/weather/WeatherModel';

export class AdminStore {
  @observable private _timezones: TimezoneModel[];
  @observable private _weather: WeatherModel[];

  async hydrate(timeRepository: TimeRepository, weatherRepository: WeatherRepository) {
    this._timezones = await timeRepository.getTimezones();
    this._weather = await weatherRepository.getWeather();
  }

  @action.bound
  setTimezoneZone(index: number, zone: string) {
    if (index < this.timezones.length) {
      this.timezones[index].setZone(zone);
    }
  }

  @action.bound
  setTimezoneName(index: number, name: string) {
    if (index < this.timezones.length) {
      this.timezones[index].setName(name);
    }
  }

  @action.bound
  setWeatherUrl(index: number, url: string) {
    if (index < this.weather.length) {
      this.weather[index].setUrl(url);
    }
  }

  @computed
  get timezones() {
    return this._timezones;
  }

  @computed
  get weather() {
    return this._weather;
  }
}