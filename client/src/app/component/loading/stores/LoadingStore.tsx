import { action, computed, observable } from 'mobx';

export class LoadingState {
  private static instance: LoadingState;
  @observable private _loading: boolean;

  static getInstance() {
    if (!LoadingState.instance) {
      LoadingState.instance = new LoadingState();
      LoadingState.instance._loading = false;
    }
    return LoadingState.instance;
  }

  get loading(): boolean {
    return this._loading;
  }

  set loading(active: boolean) {
    this._loading = active;
  }
}

export class LoadingStore {
  private loadingState: LoadingState;

  constructor() {
    this.loadingState = LoadingState.getInstance();
  }

  @computed
  get loading() {
    return this.loadingState.loading;
  }

  @action.bound
  setLoading(loading: boolean) {
    this.loadingState.loading = loading;
  }

  @action.bound
  async performLoading(actionTo: () => Promise<void>) {
    try {
      this.setLoading(true);
      await actionTo();
    } finally {
      this.setLoading(false);
    }
  }
}