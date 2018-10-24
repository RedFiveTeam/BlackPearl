import { ResourceStore } from '../resource/stores/ResourceStore';
import { TimeStore } from './time/TimeStore';
import { AcronymStore } from '../component/widgets/acronym/AcronymStore';

const acronymStore = new AcronymStore();
const resourceStore = new ResourceStore();
const timeStore = new TimeStore();

export interface Stores {
  acronymStore: AcronymStore;
  resourceStore: ResourceStore;
  timeStore: TimeStore;
}

export const stores = {
  acronymStore,
  resourceStore,
  timeStore
};