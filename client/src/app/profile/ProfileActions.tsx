import { ProfileStore } from './ProfileStore';
import { ProfileRepository } from './ProfileRepository';
import { Repositories } from '../utils/Repositories';
import { Stores } from '../utils/Stores';
import { action } from 'mobx';
import { ProfileModel } from './ProfileModel';

export class ProfileActions {
  private profileStore: ProfileStore;
  private profileRepository: ProfileRepository;

  constructor(stores: Partial<Stores>, repositories: Partial<Repositories>) {
    this.profileStore = stores.profileStore!;
    this.profileRepository = repositories.profileRepository!;
  }

  @action.bound
  async setProfile() {
    let profile = await this.profileRepository.getProfile();
    this.profileStore.setProfile(profile);
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

  @action.bound
  async toggleWidgetsVisible() {
    this.profileStore.profile.setWidgetsVisible(this.profileStore.profile.widgetsVisible ? 0 : 1);
    await this.updateProfile();
  }

  @action.bound
  generateDisplayName(profile: ProfileModel): string {
    let username = profile.cardID;
    let firstName = username.substring(0, username.indexOf('.'));
    if (username.includes('.mil')) {
      let lastName = username.substring(firstName.length + 3, username.indexOf('@') - 4);
      username = `${firstName} ${lastName}`;
      return username;
    } else if (username.includes('@')) {
      let lastName = username.substring(username.indexOf('.') + 1, username.indexOf('@'));
      username = `${firstName} ${lastName}`;
      return username;
    }
    return username;
  }
}