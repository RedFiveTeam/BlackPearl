import { action, computed, observable } from 'mobx';

export class ClickModel {
  @observable private _resourceID: number = 0;
  @observable private _clicks: number = 0;

  constructor(
    resourceID: number,
    clicks: number
  ) {
    this._resourceID = resourceID;
    this._clicks = clicks;
  }

  @computed
  get resourceID(): number {
    return this._resourceID;
  }

  @computed
  get clicks(): number {
    return this._clicks;
  }

  @action.bound
  setResourceID(id: number) {
    this._resourceID = id;
  }

  @action.bound
  setClicks(clicks: number) {
    this._clicks = clicks;
  }
}