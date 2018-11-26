import { action } from 'mobx';
import { InformationRepository } from '../repositories/InformationRepository';
import { InformationStore } from '../InformationStore';
import { Repositories } from '../../../../utils/Repositories';
import { Stores } from '../../../../utils/Stores';

export class InformationActions {
  private informationRepository: InformationRepository;
  private informationStore: InformationStore;

  constructor(stores: Partial<Stores>, repositories: Partial<Repositories>) {
    this.informationRepository = repositories.informationRepository!;
    this.informationStore = stores.informationStore!;
  }

  @action.bound
  async setupInformation() {
    let info = await this.informationRepository.findAll();
    this.informationStore.setImageServer(info.filter(i => i.name === 'Image Server').map(i => {
      return i.content;
    })[0]);
    this.informationStore.setCallOutFormat(info.filter(i => i.name === 'Call Out Format').map(i => {
      return i.content;
    })[0]);
    this.informationStore.setImageServerJWICS(info.filter(i => i.name === 'Image Server (JWICS)').map(i => {
      return i.content;
    })[0]);
    this.informationStore.setAuabServer(info.filter(i => i.name === 'AUAB').map(i => {
      return i.content;
    })[0]);
    this.informationStore.setNavcentServer(info.filter(i => i.name === 'NAVCENT').map(i => {
      return i.content;
    })[0]);
    this.informationStore.setDsnNumber(info.filter(i => i.name === 'DSN').map(i => {
      return i.content;
    })[0]);
    this.informationStore.setSvoipNumber(info.filter(i => i.name === 'SVOIP').map(i => {
      return i.content;
    })[0]);
    this.informationStore.setTsvoipNumber(info.filter(i => i.name === 'TSVOIP').map(i => {
      return i.content;
    })[0]);
    this.informationStore.setJwicsServer(info.filter(i => i.name === 'JWICS').map(i => {
      return i.content;
    })[0]);
  }
}