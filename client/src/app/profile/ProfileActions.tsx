import { ProfileStore } from './ProfileStore';
import { ProfileRepository } from './ProfileRepository';
import { Repositories } from '../utils/Repositories';
import { Stores } from '../utils/Stores';
import { action } from 'mobx';
import { MetricRepository } from '../component/metrics/metric/MetricRepository';

export class ProfileActions {
  private profileStore: ProfileStore;
  private profileRepository: ProfileRepository;
  private metricRepository: MetricRepository;

  constructor(stores: Partial<Stores>, repositories: Partial<Repositories>) {
    this.profileStore = stores.profileStore!;
    this.profileRepository = repositories.profileRepository!;
    this.metricRepository = repositories.metricRepository!;
  }

  @action.bound
  async setProfile() {
    let profile = await this.profileRepository.getProfile();
    this.profileStore.setProfile(profile);
  }

  @action.bound
  async addLogin() {
    await this.metricRepository.addLogin(this.profileStore.profile);
  }

  @action.bound
  async updateProfile() {
    await this.profileRepository.updateProfile(this.profileStore.profile);
  }

  async changeDefaultTab(tab: number) {
    this.profileStore.profile.setSpecialty(tab);
    await this.updateProfile();
  }

  @action.bound
  async updateSort(sort: number) {
    this.profileStore.profile.setSort(sort);
    await this.profileRepository.updateProfile(this.profileStore.profile);
  }
}