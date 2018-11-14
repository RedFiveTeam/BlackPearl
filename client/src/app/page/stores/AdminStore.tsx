import { action, computed, observable } from 'mobx';
import { TimezoneModel } from '../../component/widgets/time/TimezoneModel';
import { TimeRepository } from '../../component/widgets/time/repositories/TimeRepository';
import { WeatherRepository } from '../../component/widgets/weather/repositories/WeatherRepository';
import { WeatherModel } from '../../component/widgets/weather/WeatherModel';
import { InformationModel } from '../../component/card/information/InformationModel';
import { InformationRepository } from '../../component/card/information/repositories/InformationRepository';
import { AcronymModel } from '../../component/widgets/acronym/AcronymModel';
import { AcronymRepository } from '../../component/widgets/acronym/repositories/AcronymRepository';
import { LoadingStore } from '../../component/loading/stores/LoadingStore';

export class AdminStore extends LoadingStore {
  @observable private _acronym: AcronymModel[];
  @observable private _pendingAcronym: AcronymModel;
  @observable private _information: InformationModel[];
  @observable private _timezones: TimezoneModel[];
  @observable private _weather: WeatherModel[];

  async hydrate(
    acronymRepository: AcronymRepository,
    informationRepository: InformationRepository,
    timeRepository: TimeRepository,
    weatherRepository: WeatherRepository
  ) {
    this._acronym = await acronymRepository.findAll();
    this._information = await informationRepository.findAll();
    this._timezones = await timeRepository.getTimezones();
    this._weather = await weatherRepository.getWeather();
  }

  @action.bound
  setPendingAcronym(acronym: AcronymModel) {
    this._pendingAcronym = acronym;
  }

  @action.bound
  setAcronym(acronym: AcronymModel[]) {
    this._acronym = acronym;
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
  get acronym() {
    return this._acronym;
  }

  @computed
  get pendingAcronym() {
    return this._pendingAcronym;
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