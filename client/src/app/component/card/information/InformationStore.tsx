import { LoadingStore } from '../../loading/stores/LoadingStore';
import { action, computed, observable } from 'mobx';

export class InformationStore extends LoadingStore {
  @observable private _imageServer: string = '';
  @observable private _callOutFormat: string = '';
  @observable private _imageServerJWICS: string = '';
  @observable private _auabServer: string = '';
  @observable private _navcentServer: string = '';
  @observable private _dsnNumber: string = '';
  @observable private _svoipNumber: string = '';
  @observable private _tsvoipNumber: string = '';
  @observable private _jwicsServer: string = '';

  @action.bound
  setImageServer(value: string) {
    this._imageServer = value;
  }

  @action.bound
  setCallOutFormat(value: string) {
    this._callOutFormat = value;
  }

  @action.bound
  setImageServerJWICS(value: string) {
    this._imageServerJWICS = value;
  }

  @action.bound
  setAuabServer(value: string) {
    this._auabServer = value;
  }

  @action.bound
  setNavcentServer(value: string) {
    this._navcentServer = value;
  }

  @action.bound
  setDsnNumber(value: string) {
    this._dsnNumber = value;
  }

  @action.bound
  setSvoipNumber(value: string) {
    this._svoipNumber = value;
  }

  @action.bound
  setTsvoipNumber(value: string) {
    this._tsvoipNumber = value;
  }

  @action.bound
  setJwicsServer(value: string) {
    this._jwicsServer = value;
  }

  @computed
  get imageServer(): string {
    return this._imageServer;
  }

  @computed
  get callOutFormat(): string {
    return this._callOutFormat;
  }

  @computed
  get imageServerJWICS(): string {
    return this._imageServerJWICS;
  }

  @computed
  get auabServer(): string {
    return this._auabServer;
  }

  @computed
  get navcentServer(): string {
    return this._navcentServer;
  }

  @computed
  get dsnNumber(): string {
    return this._dsnNumber;
  }

  @computed
  get svoipNumber(): string {
    return this._svoipNumber;
  }

  @computed
  get tsvoipNumber(): string {
    return this._tsvoipNumber;
  }

  @computed
  get jwicsServer(): string {
    return this._jwicsServer;
  }
}