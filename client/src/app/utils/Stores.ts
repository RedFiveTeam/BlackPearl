import { ResourceStore } from '../resource/stores/ResourceStore';

const resourceStore = new ResourceStore();

export interface Stores {
  resourceStore: ResourceStore;
}

export const stores = {
  resourceStore,
};