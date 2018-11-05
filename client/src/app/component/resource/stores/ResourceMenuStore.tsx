import { action, computed, observable } from 'mobx';

export class ResourceMenuStore {
  @observable private _menuVisible: boolean;

  hydrate() {
    this._menuVisible = false;
  }

  @action.bound
  toggleMenuVisibility() {
    this._menuVisible = !this._menuVisible;
  }

  @action.bound
  menuVisibilityOn() {
    this._menuVisible = true;
  }

  @action.bound
  menuVisibilityOff() {
    this._menuVisible = false;
  }

  @computed
  get menuVisible() {
    return this._menuVisible;
  }
}