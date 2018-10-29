import { WeatherModel } from './WeatherModel';
import { action, computed, observable } from 'mobx';

export class WeatherStore {
  @observable private _weather: WeatherModel[] = [];

  @action.bound
  setWeather(weather: WeatherModel[]) {
    this._weather = weather;
  }

  @computed
  get weather() {
    return this._weather;
  }
}