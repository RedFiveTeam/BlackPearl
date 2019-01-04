import { action } from 'mobx';
import { AdminStore } from '../stores/AdminStore';
import { TimeRepository } from '../../component/widgets/time/repositories/TimeRepository';
import { Stores } from '../../utils/Stores';
import { Repositories } from '../../utils/Repositories';
import { WeatherRepository } from '../../component/widgets/weather/repositories/WeatherRepository';
import { InformationRepository } from '../../component/card/information/repositories/InformationRepository';
import { AcronymRepository } from '../../component/widgets/acronym/repositories/AcronymRepository';
import { AcronymModel } from '../../component/widgets/acronym/AcronymModel';
import { BlameRepository } from '../../component/resource/blame/repositories/BlameRepository';
import { toast } from 'react-toastify';
import { TimezoneModel } from '../../component/widgets/time/TimezoneModel';
import { WeatherModel } from '../../component/widgets/weather/WeatherModel';
import { InformationModel } from '../../component/card/information/InformationModel';

export class AdminActions {
  private adminStore: AdminStore;
  private acronymRepository: AcronymRepository;
  private timeRepository: TimeRepository;
  private weatherRepository: WeatherRepository;
  private informationRepository: InformationRepository;
  private blameRepository: BlameRepository;

  constructor(stores: Partial<Stores>, repositories: Partial<Repositories>) {
    this.adminStore = stores.adminStore!;
    this.acronymRepository = repositories.acronymRepository!;
    this.timeRepository = repositories.timeRepository!;
    this.weatherRepository = repositories.weatherRepository!;
    this.informationRepository = repositories.informationRepository!;
    this.blameRepository = repositories.blameRepository!;
  }

  @action.bound
  async initializeStores() {
    await this.adminStore.hydrate(
      this.acronymRepository,
      this.informationRepository,
      this.timeRepository,
      this.weatherRepository,
      this.blameRepository
    );
  }

  @action.bound
  async submitChanges() {
    await this.timeRepository.update(this.adminStore.pendingTimezones);
    this.adminStore.setTimezones(this.adminStore!.pendingTimezones.map(tz => {
      return new TimezoneModel(tz.id, tz.position, tz.zone, tz.name);
    }));
    await this.weatherRepository.update(this.adminStore.pendingWeather);
    this.adminStore.setWeather(this.adminStore!.pendingWeather.map(w => {
      return new WeatherModel(w.id, w.url, w.label);
    }));
    await this.informationRepository.update(this.adminStore.pendingInformation);
    this.adminStore.setInformation(this.adminStore!.pendingInformation.map(i => {
      return new InformationModel(i.id, i.name, i.content);
    }));
    toast.success('All Changes Saved');
  }

  @action.bound
  resetTab() {
    this.adminStore.setPendingTimezones(this.adminStore.timezones ? this.adminStore.timezones.map(tz => {
      return new TimezoneModel(tz.id, tz.position, tz.zone, tz.name);
    }) : []);
    this.adminStore.setPendingWeather(this.adminStore.weather ? this.adminStore.weather.map(w => {
      return new WeatherModel(w.id, w.url, w.label);
    }) : []);
    this.adminStore.setPendingInformation(this.adminStore.information ? this.adminStore.information.map(i => {
      return new InformationModel(i.id, i.name, i.content);
    }) : []);
  }

  @action.bound
  updatePendingAcronym(acronymTitle: string, definition: string) {
    let acronym = new AcronymModel();
    acronym.setAcronym(acronymTitle);
    acronym.setDefinition(definition);
    this.adminStore.setPendingAcronym(acronym);
    toast.success('AcronymRow Added');
  }
}
