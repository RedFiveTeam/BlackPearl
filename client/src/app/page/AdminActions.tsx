import { action } from 'mobx';
import { AdminStore } from './AdminStore';
import { TimeRepository } from '../utils/time/repositories/TimeRepository';
import { Stores } from '../utils/Stores';
import { Repositories } from '../utils/Repositories';
import { WeatherRepository } from '../component/widgets/weather/repositories/WeatherRepository';

export class AdminActions {
  private adminStore: AdminStore;
  private timeRepository: TimeRepository;
  private weatherRepository: WeatherRepository;

  constructor(stores: Partial<Stores>, repositories: Partial<Repositories>) {
    this.adminStore = stores.adminStore!;
    this.timeRepository = repositories.timeRepository!;
    this.weatherRepository = repositories.weatherRepository!;
  }

  @action.bound
  async initializeStores() {
    await this.adminStore.hydrate(this.timeRepository, this.weatherRepository);
  }

  @action.bound
  async submitChanges() {
    await this.timeRepository.update(this.adminStore.timezones);
    await this.weatherRepository.update(this.adminStore.weather);
  }
}
