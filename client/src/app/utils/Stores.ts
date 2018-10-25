import { ResourceStore } from '../resource/stores/ResourceStore';
import { TimeStore } from './time/TimeStore';
import { AdminStore } from '../page/AdminStore';
import { AcronymStore } from '../component/widgets/acronym/AcronymStore';
import { CoordinateConverterStore } from '../component/widgets/coordinateConverter/CoordinateConverterStore';

const adminStore = new AdminStore();
const acronymStore = new AcronymStore();
const coordinateConverterStore = new CoordinateConverterStore();
const resourceStore = new ResourceStore();
const timeStore = new TimeStore();

export interface Stores {
  adminStore: AdminStore;
  acronymStore: AcronymStore;
  coordinateConverterStore: CoordinateConverterStore;
  resourceStore: ResourceStore;
  timeStore: TimeStore;
}

export const stores = {
  adminStore,
  acronymStore,
  coordinateConverterStore,
  resourceStore,
  timeStore
};