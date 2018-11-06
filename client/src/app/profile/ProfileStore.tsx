import { ProfileModel } from './ProfileModel';
import { action, computed, observable } from 'mobx';

export class ProfileStore {
  @observable private _profile: ProfileModel;

  @action.bound
  setProfile(profile: ProfileModel) {
    this._profile = profile;
  }

  @computed
  get profile() {
    return this._profile;
  }
}