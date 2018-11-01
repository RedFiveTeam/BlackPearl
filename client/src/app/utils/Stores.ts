import { ResourceStore } from '../resource/stores/ResourceStore';
import { TimeStore } from '../component/widgets/time/TimeStore';
import { AdminStore } from '../page/stores/AdminStore';
import { AcronymStore } from '../component/widgets/acronym/AcronymStore';
import { WeatherStore } from '../component/widgets/weather/WeatherStore';
import { CoordinateConverterStore } from '../component/widgets/coordinateConverter/store/CoordinateConverterStore';
import { LoadingStore } from '../component/loading/stores/LoadingStore';

const adminStore = new AdminStore();
const acronymStore = new AcronymStore();
const coordinateConverterStore = new CoordinateConverterStore();
const loadingStore = new LoadingStore();
const resourceStore = new ResourceStore();
const timeStore = new TimeStore();
const weatherStore = new WeatherStore();

export interface Stores {
  adminStore: AdminStore;
  acronymStore: AcronymStore;
  coordinateConverterStore: CoordinateConverterStore;
  loadingStore: LoadingStore;
  resourceStore: ResourceStore;
  timeStore: TimeStore;
  weatherStore: WeatherStore;
}

export const stores = {
  adminStore,
  acronymStore,
  coordinateConverterStore,
  loadingStore,
  resourceStore,
  timeStore,
  weatherStore
};