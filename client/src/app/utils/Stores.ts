import { ResourceStore } from '../resource/stores/ResourceStore';
import { TimeStore } from './time/TimeStore';

const resourceStore = new ResourceStore();
const timeStore = new TimeStore();

export interface Stores {
  resourceStore: ResourceStore;
  timeStore: TimeStore;
}

export const stores = {
  resourceStore,
  timeStore
};