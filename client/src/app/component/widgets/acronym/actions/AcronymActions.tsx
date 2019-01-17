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
      let printString = fuzzysort.highlight(el, '<span class="searchMatch">', '</span>');
      if (!printString) {
        printString = '';
      }
      return new AcronymModel(
        el.obj.id,
        el.obj.acronym,
        el.obj.definition,
        printString
      );
    });
    this.acronymStore.setFilteredAcronyms(matches);
  }

  @action.bound
  async deleteAcronym(acronym: AcronymModel) {
    await this.acronymRepository.deleteAcronym(acronym);
    this.acronymStore.setPendingDelete(null);
    await this.setAllAcronyms();
    await this.setFilteredAcronyms(this.acronymStore.search);
    toast.success(acronym.acronym + ' Deleted');
  }

  @action.bound
  async updateAcronym(acronym: AcronymModel) {
    await this.acronymRepository.updateAcronym(acronym);
    await this.setAllAcronyms();
    this.acronymStore.setSearch(acronym.acronym);

    await this.setFilteredAcronyms(this.acronymStore.search);
    toast.success(acronym.acronym + ' Updated');
  }

  @action.bound
  createPendingDelete(acronym: AcronymModel) {
    this.acronymStore.setPendingDelete(acronym);
  }

  @action.bound
  clearPendingDelete() {
    this.acronymStore.setPendingDelete(null);
  }

  @action.bound
  async addAcronym(acronym: string, definition: string) {
    this.acronymStore!.pendingAcronym!.setAcronym(acronym);
    this.acronymStore!.pendingAcronym!.setDefinition(definition);
    await this.acronymRepository.saveAcronym(this.acronymStore.pendingAcronym!);
    this.acronymStore.setPendingAcronym(null);
    await this.setAllAcronyms();
    this.acronymStore.setSearch(acronym);
    await this.setFilteredAcronyms(acronym);
    toast.success(acronym + ' Added');
  }
}