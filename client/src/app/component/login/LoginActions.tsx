import { ProfileRepository } from '../../profile/ProfileRepository';
import { Stores } from '../../utils/Stores';
import { Repositories } from '../../utils/Repositories';
import { ProfileStore } from '../../profile/ProfileStore';
import { action } from 'mobx';
import { ProfileModel } from '../../profile/ProfileModel';
import Fuse = require('fuse.js');

export class LoginActions {
  private profileStore: ProfileStore;
  private profileRepository: ProfileRepository;

  constructor(stores: Partial<Stores>, repositories: Partial<Repositories>) {
    this.profileStore = stores.profileStore!;
    this.profileRepository = repositories.profileRepository!;
  }

  async loginAndLinkProfile(profile: ProfileModel) {
    profile.setAltID(this.profileStore.username);
    this.profileStore.setProfile(await this.profileRepository.login(profile));
    this.profileStore.setLoginMatches([]);
  }

  async login(altID: string) {
    this.profileStore!.setApproximateMatch(false);
    let profiles = this.profileStore!.profiles;
    for (let i = 0; i < profiles.length; i++) {
      if (this.isExactMatch(profiles[i], altID)) {
        this.profileStore.setProfile(profiles[i]);
        await this.profileRepository.login(profiles[i]);
        return;
      } else {
        let strippedAltID = altID.replace('.mil', '').replace('.ctr', '').replace(/[\d+]+/, '');
        let cardID = this.formatCardID(profiles[i].cardID);
        if (strippedAltID === cardID) {
          this.profileStore.profiles[i].setAltID(altID);
          this.profileStore.setProfile(await this.profileRepository.login(profiles[i]));
          return;
        }
      }
    }
    await this.findApproximateMatch(altID);
    if (!this.profileStore!.approximateMatch) {
      await this.findProfileMatches(altID);
    }
  }

  async findApproximateMatch(altID: string) {
    let options = {
      shouldSort: true,
      threshold: .2,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: [
        'altID'
      ]
    };

    const fuse = new Fuse(this.profileStore.profiles, options);
    let matches = fuse.search(altID);
    if (matches.length > 0) {
      this.profileStore.setLoginMatches(matches);
      this.profileStore.setApproximateMatch(true);
    }
  }

  isExactMatch(profile: ProfileModel, altID: string) {
    return profile.altID === altID;
  }

  async findProfileMatches(altID: string) {
    let options = {
      shouldSort: true,
      threshold: .2,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: [
        'formattedCardID'
      ]
    };
    const fuse = new Fuse(this.profileStore.profiles, options);
    let matches = fuse.search(altID);
    if (matches.length > 0) {
      this.profileStore.setLoginMatches(matches);
    } else {
      await this.createNewProfile(altID);
    }
  }

  async createNewProfile(altID: string) {
    let newProfile = new ProfileModel(null, altID, altID);
    this.profileStore.setProfile(await this.profileRepository.login(newProfile));
    this.profileStore.setLoginMatches([]);
  }

  formatCardID(cardID: string): string {
    if (this.validateLogin(cardID)) {
      let splitCardID = cardID.split('.');
      return (splitCardID[1] + '.' + splitCardID[2].charAt(0) + '.' + splitCardID[0]).toLowerCase();
    }
    return cardID;
  }

  async loginAsGuest() {
    this.profileStore.setProfile(await this.profileRepository.login(this.profileStore.guestProfile));
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
