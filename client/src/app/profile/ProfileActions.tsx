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
  deleteCookie() {
    document.cookie = 'account=; Path=/api; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }

  @action.bound
  async setProfile() {
    let profile = await this.profileRepository.getProfile();
    this.profileStore.setProfile(profile);
  }

  @action.bound
  async getAllProfiles() {
    let profiles = await this.profileRepository.getAllProfiles();
    this.profileStore!.setProfiles(profiles);
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
    let username = profile.altID;
    return username;
  }

  @action.bound
  filterProfiles() {
    let filteredProfiles = this.profileStore!.profiles.filter((p: ProfileModel) => {
      return p.cardID.toLowerCase().includes(this.profileStore!.searchValue.toLowerCase());
    });
    this.profileStore!.setFilteredProfileList(filteredProfiles);
  }

  @action.bound
  checkForPreviousProfile() {
    let profileStore = this.profileStore;
    if (profileStore.profile.altID !== 'Guest') {
      profileStore!.setHasProfile(true);
    } else {
      profileStore!.setHasProfile(false);
    }
  }
}
