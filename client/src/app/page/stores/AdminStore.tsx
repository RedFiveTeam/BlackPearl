import { action, computed, observable } from 'mobx';
import { TimezoneModel } from '../../component/widgets/time/TimezoneModel';
import { TimeRepository } from '../../component/widgets/time/repositories/TimeRepository';
import { WeatherRepository } from '../../component/widgets/weather/repositories/WeatherRepository';
import { WeatherModel } from '../../component/widgets/weather/WeatherModel';
import { InformationModel } from '../../component/card/information/InformationModel';
import { InformationRepository } from '../../component/card/information/repositories/InformationRepository';

export class AdminStore {
  @observable private _timezones: TimezoneModel[];
  @observable private _weather: WeatherModel[];
  @observable private _information: InformationModel[];

  async hydrate(
    timeRepository: TimeRepository,
    weatherRepository: WeatherRepository,
    informationRepository: InformationRepository
  ) {
    this._timezones = await timeRepository.getTimezones();
    this._weather = await weatherRepository.getWeather();
    this._information = await informationRepository.findAll();
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

  @action.bound
  setWeatherLabel(index: number, label: string) {
    if (index < this.weather.length) {
      this.weather[index].setLabel(label);
    }
  }

  @action.bound
  setInformationContent(index: number, content: string) {
    if (index < this.information.length) {
      this.information[index].setContent(content);
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

  @computed
  get information() {
    return this._information;
  }
}