import { ResourceStore } from '../component/resource/stores/ResourceStore';
import { TimeStore } from '../component/widgets/time/TimeStore';
import { AdminStore } from '../page/stores/AdminStore';
import { AcronymStore } from '../component/widgets/acronym/AcronymStore';
import { WeatherStore } from '../component/widgets/weather/WeatherStore';
import { CoordinateConverterStore } from '../component/widgets/coordinateConverter/store/CoordinateConverterStore';
import { LoadingStore } from '../component/loading/stores/LoadingStore';
import { ProfileStore } from '../profile/ProfileStore';
import { InformationStore } from '../component/card/information/InformationStore';
import { OperationStore } from '../component/card/operation/stores/OperationStore';
import { MetricsStore } from '../page/stores/MetricsStore';

const adminStore = new AdminStore();
const acronymStore = new AcronymStore();
const coordinateConverterStore = new CoordinateConverterStore();
const loadingStore = new LoadingStore();
const profileStore = new ProfileStore();
const resourceStore = new ResourceStore();
const timeStore = new TimeStore();
const weatherStore = new WeatherStore();
const informationStore = new InformationStore();
const operationStore = new OperationStore();
const metricsStore = new MetricsStore();

export interface Stores {
  adminStore: AdminStore;
  acronymStore: AcronymStore;
  coordinateConverterStore: CoordinateConverterStore;
  loadingStore: LoadingStore;
  profileStore: ProfileStore;
  resourceStore: ResourceStore;
  timeStore: TimeStore;
  weatherStore: WeatherStore;
  informationStore: InformationStore;
  operationStore: OperationStore;
  metricsStore: MetricsStore;
}

export const stores = {
  adminStore,
  acronymStore,
  coordinateConverterStore,
  loadingStore,
  profileStore,
  resourceStore,
  timeStore,
  weatherStore,
  informationStore,
  operationStore,
  metricsStore
};