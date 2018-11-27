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
    await this.timeRepository.update(this.adminStore.timezones);
    await this.weatherRepository.update(this.adminStore.weather);
    await this.informationRepository.update(this.adminStore.information);
    toast.success('All Changes Saved');
  }

  @action.bound
  updatePendingAcronym(acronymTitle: string, definition: string) {
    let acronym = new AcronymModel();
    acronym.setAcronym(acronymTitle);
    acronym.setDefinition(definition);
    this.adminStore.setPendingAcronym(acronym);
    toast.success('Acronym Added');
  }

  @action.bound
  async addAcronym() {
    await this.acronymRepository.saveAcronym(this.adminStore.pendingAcronym);
  }
}
