import { ResourceStore } from '../resource/stores/ResourceStore';
import { TimeStore } from './time/TimeStore';
import { AdminStore } from '../page/AdminStore';
import { AcronymStore } from '../component/widgets/acronym/AcronymStore';

const adminStore = new AdminStore();
const acronymStore = new AcronymStore();
const resourceStore = new ResourceStore();
const timeStore = new TimeStore();

export interface Stores {
  adminStore: AdminStore;
  acronymStore: AcronymStore;
  resourceStore: ResourceStore;
  timeStore: TimeStore;
}

export const stores = {
  adminStore,
  acronymStore,
  resourceStore,
  timeStore
};