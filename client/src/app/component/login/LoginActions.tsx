import { ProfileRepository } from '../../profile/ProfileRepository';
import { Stores } from '../../utils/Stores';
import { Repositories } from '../../utils/Repositories';
import { ProfileStore } from '../../profile/ProfileStore';
import { action } from 'mobx';
import { ProfileModel } from '../../profile/ProfileModel';

export class LoginActions {
  private profileStore: ProfileStore;
  private profileRepository: ProfileRepository;

  constructor(stores: Partial<Stores>, repositories: Partial<Repositories>) {
    this.profileStore = stores.profileStore!;
    this.profileRepository = repositories.profileRepository!;
  }

  async login(altID: string) {
    let profiles = this.profileStore!.profiles;
    for (let i = 0; i < profiles.length; i++) {
      if (this.isExactMatch(profiles[i], altID)) {
        this.profileStore.setProfile(profiles[i]);
        await this.profileRepository.login(profiles[i]);
        return;
      } else {
        let strippedAltID = altID.replace('.mil', '').replace('.ctr', '');
        let cardID = this.formatCardID(profiles[i].cardID);
        if (strippedAltID === cardID) {
          this.profileStore.profiles[i].setAltID(altID);
          this.profileStore.setProfile(await this.profileRepository.login(profiles[i]));
          return;
        }
      }
    }
    await this.createNewProfile(altID);
  }

  async createNewProfile(altID: string) {
    let newProfile = new ProfileModel(null, altID, altID);
    this.profileStore.setProfile(await this.profileRepository.login(newProfile));
  }

  isExactMatch(profile: ProfileModel, altID: string) {
    return profile.altID === altID.replace('.mil', '').replace('.ctr', '');
  }

  formatCardID(cardID: string): string {
    let splitCardID = cardID.split('.');
    return (splitCardID[1] + '.' + splitCardID[2].charAt(0) + '.' + splitCardID[0]).toLowerCase();
  }

  async loginAsGuest() {
    await this.login('Guest');
    this.profileStore!.setHasProfile(true);
  }

  @action.bound
  async updateProfileWithExistingResources() {
    if (this.profileStore!.isLinkInfoValid) {
      await this.editProfile();
      await this.login(this.profileStore.username);
      return true;
    } else {
      return false;
    }
  }

  async editProfile() {
    let profile = this.profileStore!.selectedProfile;
    let altID = this.profileStore!.username;
    profile.setAltID(altID);

    this.profileStore!.setHasOldProfile(false);
    this.profileStore!.setHasProfile(true);
    await this.profileRepository.updateProfile(this.profileStore!.selectedProfile);
  }

  validateLogin(userName: string) {
    let pattern = new RegExp(/.+[.].+[.].+/);
    return pattern.test(userName);
  }
}
