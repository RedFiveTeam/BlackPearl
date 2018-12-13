import { AcronymRepository } from '../repositories/AcronymRepository';
import { AcronymStore } from '../AcronymStore';
import { Repositories } from '../../../../utils/Repositories';
import { Stores } from '../../../../utils/Stores';
import { action } from 'mobx';
import { AcronymModel } from '../AcronymModel';
import * as fuzzysort from 'fuzzysort';
import { toast } from 'react-toastify';

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

  @action.bound
  async setFilteredAcronyms(filter: string) {
    const list = this.acronymStore.acronyms;
    const opts = {
      limit: 100,
      key: 'printString'
    };
    let results = fuzzysort.go(filter, list, opts);
    let matches = results.map((el) => {
      return (
        '<span id="' + el.obj.id + '">' +
        fuzzysort.highlight(el, '<span class="searchMatch" style="background: #FFFF00;">', '</span>') +
        '</span>'
      );
    });
    let filteredAcronyms = matches.map((el) => { return el; });
    this.acronymStore.setFilteredAcronyms(filteredAcronyms);
  }

  @action.bound
  async deleteAcronym(acronym: AcronymModel) {
    await this.acronymRepository.deleteAcronym(acronym);
    this.acronymStore.setPendingDelete(null);
    await this.setAllAcronyms();
    await this.setFilteredAcronyms('');
    toast.success('Acronym Deleted');
  }
}