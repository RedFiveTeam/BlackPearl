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
import { BlameModel } from '../../component/resource/blame/BlameModel';
import { BlameRepository } from '../../component/resource/blame/repositories/BlameRepository';

export class AdminStore extends LoadingStore {
  @observable private _acronym: AcronymModel[];
  @observable private _pendingAcronym: AcronymModel;
  @observable private _pendingDeleteAcronym: AcronymModel | null = null;
  @observable private _information: InformationModel[];
  @observable private _pendingInformation: InformationModel[];
  @observable private _timezones: TimezoneModel[];
  @observable private _pendingTimezones: TimezoneModel[];
  @observable private _weather: WeatherModel[];
  @observable private _pendingWeather: WeatherModel[];
  @observable private _currentTab: string;
  @observable private _blames: BlameModel[];

  async hydrate(
    acronymRepository: AcronymRepository,
    informationRepository: InformationRepository,
    timeRepository: TimeRepository,
    weatherRepository: WeatherRepository,
    blameRepository: BlameRepository
  ) {
    this._acronym = await acronymRepository.findAll();
    this._information = await informationRepository.findAll();
    this._pendingInformation = [];
    this._pendingInformation = this._information.map(i => {
      return new InformationModel(i.id, i.name, i.content);
    });
    this._timezones = await timeRepository.getTimezones();
    this._pendingTimezones = [];
    this._pendingTimezones = this._timezones.map(tz => {
      return new TimezoneModel(tz.id, tz.position, tz.zone, tz.name);
    });
    this._weather = await weatherRepository.getWeather();
    this._pendingWeather = [];
    this._pendingWeather = this._weather.map(w => {
      return new WeatherModel(w.id, w.url, w.label);
    });
    this._blames = await blameRepository.findAll();
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
  setPendingTimezoneZone(index: number, zone: string) {
    if (index < this.pendingTimezones.length) {
      this.pendingTimezones[index].setZone(zone);
    }
  }

  @action.bound
  setPendingTimezoneName(index: number, name: string) {
    if (index < this.pendingTimezones.length) {
      this.pendingTimezones[index].setName(name);
    }
  }

  @action.bound
  setPendingWeatherUrl(index: number, url: string) {
    if (index < this.pendingWeather.length) {
      this.pendingWeather[index].setUrl(url);
    }
  }

  @action.bound
  setPendingWeatherLabel(index: number, label: string) {
    if (index < this.pendingWeather.length) {
      this.pendingWeather[index].setLabel(label);
    }
  }

  @action.bound
  setPendingInformationContent(index: number, content: string) {
    if (index < this.pendingInformation.length) {
      this.pendingInformation[index].setContent(content);
    }
  }

  @action.bound
  setInformation(information: InformationModel[]) {
    this._information = information;
  }

  @action.bound
  setPendingInformation(information: InformationModel[]) {
    this._pendingInformation = information;
  }

  @action.bound
  setCurrentTab(tab: string) {
    this._currentTab = tab;
  }

  @action.bound
  setBlames(blames: BlameModel[]) {
    this._blames = blames;
  }

  @action.bound
  setTimezones(timezones: TimezoneModel[]) {
    this._timezones = timezones;
  }

  @action.bound
  setPendingTimezones(timezones: TimezoneModel[]) {
    this._pendingTimezones = timezones;
  }

  @action.bound
  setWeather(weather: WeatherModel[]) {
    this._weather = weather;
  }

  @action.bound
  setPendingWeather(weather: WeatherModel[]) {
    this._pendingWeather = weather;
  }

  @action.bound
  setPendingDeleteAcronym(value: AcronymModel | null) {
    this._pendingDeleteAcronym = value;
  }

  @computed
  get pendingDeleteAcronym(): AcronymModel | null {
    return this._pendingDeleteAcronym;
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
  get pendingTimezones() {
    return this._pendingTimezones;
  }

  @computed
  get weather() {
    return this._weather;
  }

  @computed
  get pendingWeather() {
    return this._pendingWeather;
  }

  @computed
  get information() {
    return this._information;
  }

  @computed
  get pendingInformation() {
    return this._pendingInformation;
  }

  @computed
  get currentTab() {
    return this._currentTab;
  }

  @computed
  get blames() {
    return this._blames;
  }
}