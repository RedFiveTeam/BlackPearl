import { ProfileModel } from './ProfileModel';
import { action, computed, observable } from 'mobx';

export class ProfileStore {
  @observable private _username: string;
  @observable private _profile: ProfileModel;
  @observable private _hasProfile: boolean;
  @observable private _hasOldProfile: boolean = false;
  @observable private _profiles: ProfileModel[] = [];
  @observable private _searchValue: string;
  @observable private _selectedProfile: ProfileModel;
  @observable private _filteredProfileList: ProfileModel[];
  @observable private _isLinkInfoValid: boolean;
  @observable private _displayLogoutModal: boolean = false;
  @observable private _loginMatches: ProfileModel[] = [];
  @observable private _approximateMatch: boolean = false;

  @action.bound
  setApproximateMatch(value: boolean) {
    this._approximateMatch = value;
  }

  @action.bound
  setSearchValue(value: string) {
    this._searchValue = value;
  }

  setUsername(value: string) {
    this._username = value;
  }

  @action.bound
  setProfiles(value: ProfileModel[]) {
    this._profiles = value;
  }

  setHasOldProfile(value: boolean) {
    this._hasOldProfile = value;
  }

  setHasProfile(value: boolean) {
    this._hasProfile = value;
  }

  setProfile(profile: ProfileModel) {
    this._profile = profile;
  }

  @action.bound
  setFilteredProfileList(value: ProfileModel[]) {
    this._filteredProfileList = value;
  }

  @action.bound
  setDisplayLogoutModal(value: boolean) {
    this._displayLogoutModal = value;
  }

  setSelectedProfile(value: ProfileModel) {
    this._selectedProfile = value;
  }

  @action.bound
  setLoginMatches(value: ProfileModel[]) {
    this._loginMatches = value;
  }

  @computed
  get approximateMatch() {
    return this._approximateMatch;
  }

  @computed
  get searchValue() {
    return this._searchValue;
  }

  @computed
  get username() {
    return this._username;
  }

  @computed
  get profile() {
    return this._profile;
  }

  @computed
  get hasProfile(): boolean {
    return this._hasProfile;
  }

  @computed
  get hasOldProfile(): boolean {
    return this._hasOldProfile;
  }

  @computed
  get profiles(): ProfileModel[] {
    return this._profiles.filter((p: ProfileModel) => {
      return (p.altID !== 'Guest');
    });
  }

  @computed
  get guestProfile(): ProfileModel {
    return this._profiles.filter((p: ProfileModel) => {
      return (p.altID === 'Guest');
    })[0];
  }

  @computed
  get selectedProfile(): ProfileModel {
    return this._selectedProfile;
  }

  @computed
  get filteredProfileList(): ProfileModel[] {
    return this._filteredProfileList;
  }

  @computed
  get isUserNameValid(): boolean {
    return (!this.username || this.username === '');
  }

  @computed
  get isLinkInfoValid() {
    this.ValidateLinkInfo();
    return this._isLinkInfoValid;
  }

  @computed
  get displayLogoutModal() {
    return this._displayLogoutModal;
  }

  @computed
  get loginMatches() {
    return this._loginMatches;
  }

  private ValidateLinkInfo() {
    if (this.isUserNameValid || !this.selectedProfile) {
      this._isLinkInfoValid = false;
    } else {
      this._isLinkInfoValid = true;
    }
  }
}
