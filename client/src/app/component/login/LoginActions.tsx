import { ProfileRepository } from '../../profile/ProfileRepository';
import { Stores } from '../../utils/Stores';
import { Repositories } from '../../utils/Repositories';
import { ProfileStore } from '../../profile/ProfileStore';
import { action } from 'mobx';
import { ProfileModel } from '../../profile/ProfileModel';
import { ResourceModel } from '../resource/ResourceModel';
import { ResourceStore } from '../resource/stores/ResourceStore';
import { ResourceRepository } from '../resource/repositories/ResourceRepository';

export class LoginActions {
  private profileStore: ProfileStore;
  private resourceStore: ResourceStore;
  private profileRepository: ProfileRepository;
  private resourceRepository: ResourceRepository;

  constructor(stores: Partial<Stores>, repositories: Partial<Repositories>) {
    this.profileStore = stores.profileStore!;
    this.resourceStore = stores.resourceStore!;
    this.profileRepository = repositories.profileRepository!;
    this.resourceRepository = repositories.resourceRepository!;
  }

  async login(altID: string) {
    this.profileStore.setProfile(await this.profileRepository.login(altID));
  }

  @action.bound
  async loginAsGuest() {
    await this.login('Guest');
    this.profileStore!.setHasProfile(true);
  }

  @action.bound
  async updateProfileWithExistingResources() {
    if (this.profileStore!.isLinkInfoValid) {
      this.linkOldResources(
        this.profileStore!.selectedProfile,
        this.profileStore!.username);
      await this.editProfile();
      await this.login(this.profileStore.username);
      return true;
    } else {
      return false;
    }
  }

  linkOldResources(oldProfile: ProfileModel, altID: string) {
    this.resourceStore.unfilteredResources.map(async (r: ResourceModel) => {
      if (r.accountID === oldProfile.cardID) {
        r.setAccountId(altID);
        await this.resourceRepository.updateResource(r);
      }
    });
  }

  async editProfile() {
    let profile = this.profileStore!.selectedProfile;
    let altID = this.profileStore!.username;

    profile.setAltID(altID);
    profile.setCardID(altID);
    this.profileStore!.setHasOldProfile(false);
    this.profileStore!.setHasProfile(true);
    await this.profileRepository.updateProfile(this.profileStore!.selectedProfile);
  }
}