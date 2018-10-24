import { AcronymRepository } from './repositories/AcronymRepository';
import { AcronymStore } from './AcronymStore';
import { Repositories } from '../../../utils/Repositories';
import { Stores } from '../../../utils/Stores';
import { action } from 'mobx';

export class AcronymActions {
  private acronymRepository: AcronymRepository;
  private acronymStore: AcronymStore;

  constructor(stores: Partial<Stores>, repositories: Partial<Repositories>) {
    this.acronymStore = stores.acronymStore!;
    this.acronymRepository = repositories.acronymRepository!;
  }

  @action.bound
  async setAllAcronyms() {
    this.acronymStore.setAcronyms(await this.acronymRepository.findAll());
  }
}