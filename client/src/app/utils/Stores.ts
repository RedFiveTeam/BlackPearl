import { ResourceStore } from '../resource/stores/ResourceStore';
import { TimeStore } from './time/TimeStore';
import { AdminStore } from '../page/AdminStore';
import { AcronymStore } from '../component/widgets/acronym/AcronymStore';
import { WeatherStore } from '../component/widgets/weather/WeatherStore';
import { CoordinateConverterStore } from '../component/widgets/coordinateConverter/CoordinateConverterStore';

const adminStore = new AdminStore();
const acronymStore = new AcronymStore();
const coordinateConverterStore = new CoordinateConverterStore();
const resourceStore = new ResourceStore();
const timeStore = new TimeStore();
const weatherStore = new WeatherStore();

export interface Stores {
  adminStore: AdminStore;
  acronymStore: AcronymStore;
  coordinateConverterStore: CoordinateConverterStore;
  resourceStore: ResourceStore;
  timeStore: TimeStore;
  weatherStore: WeatherStore;
}

export const stores = {
  adminStore,
  acronymStore,
  coordinateConverterStore,
  resourceStore,
  timeStore,
  weatherStore
};