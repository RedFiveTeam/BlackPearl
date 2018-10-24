import { AcronymRepository } from './repositories/AcronymRepository';
import { AcronymStore } from './AcronymStore';
import { Repositories } from '../../../utils/Repositories';
import { Stores } from '../../../utils/Stores';
import { action } from 'mobx';
import { AcronymModel } from './AcronymModel';
import * as fuzzysort from 'fuzzysort';

export class AcronymActions {
  private acronymRepository: AcronymRepository;
  private acronymStore: AcronymStore;

  constructor(stores: Partial<Stores>, repositories: Partial<Repositories>) {
    this.acronymStore = stores.acronymStore!;
    this.acronymRepository = repositories.acronymRepository!;
  }

  @action.bound
  async setAllAcronyms() {
    const acronyms = await this.acronymRepository.findAll();
    const acronymStrings = acronyms.map((obj: AcronymModel) => {
      return obj.acronym + ' - ' + obj.definition;
    });
    this.acronymStore.setAcronyms(acronymStrings);
  }

  @action.bound
  async setFilteredAcronyms(filter: string) {
    const list = this.acronymStore.acronyms;
    const opts = {
      limit: 100
    };
    let results = fuzzysort.go(filter, list, opts);
    let matches = results.map((el) => {
      return fuzzysort.highlight(el, '<span style="background: #FFFF00;">', '</span>');
    });
    let filteredAcronyms = matches.map((el) => { return el; });
    this.acronymStore.setFilteredAcronyms(filteredAcronyms);
  }
}