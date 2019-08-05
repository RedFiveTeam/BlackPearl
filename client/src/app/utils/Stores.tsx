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
import { MeasurementConverterStore } from '../component/widgets/measurementConverter/MeasurementConverterStore';
import { ClassificationStore } from '../component/classification/ClassificationStore';

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
const measurementConverterStore = new MeasurementConverterStore();
const classificationStore = new ClassificationStore();

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
  measurementConverterStore: MeasurementConverterStore;
  classificationStore: ClassificationStore;
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
  metricsStore,
  measurementConverterStore,
  classificationStore
};