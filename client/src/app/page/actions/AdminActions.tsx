import { action } from 'mobx';
import { AdminStore } from '../stores/AdminStore';
import { TimeRepository } from '../../component/widgets/time/repositories/TimeRepository';
import { Stores } from '../../utils/Stores';
import { Repositories } from '../../utils/Repositories';
import { WeatherRepository } from '../../component/widgets/weather/repositories/WeatherRepository';
import { InformationRepository } from '../../component/card/information/repositories/InformationRepository';

export class AdminActions {
  private adminStore: AdminStore;
  private timeRepository: TimeRepository;
  private weatherRepository: WeatherRepository;
  private informationRepository: InformationRepository;

  constructor(stores: Partial<Stores>, repositories: Partial<Repositories>) {
    this.adminStore = stores.adminStore!;
    this.timeRepository = repositories.timeRepository!;
    this.weatherRepository = repositories.weatherRepository!;
    this.informationRepository = repositories.informationRepository!;
  }

  @action.bound
  async initializeStores() {
    await this.adminStore.hydrate(this.timeRepository, this.weatherRepository, this.informationRepository);
  }

  @action.bound
  async submitChanges() {
    await this.timeRepository.update(this.adminStore.timezones);
    await this.weatherRepository.update(this.adminStore.weather);
    await this.informationRepository.update(this.adminStore.information);
  }
}
