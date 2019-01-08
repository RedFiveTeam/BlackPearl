import { ResourceActions } from '../component/resource/actions/ResourceActions';
import { stores } from './Stores';
import { WebRepositories } from './Repositories';
import { TimeActions } from '../component/widgets/time/actions/TimeActions';
import { AdminActions } from '../page/actions/AdminActions';
import { AcronymActions } from '../component/widgets/acronym/actions/AcronymActions';
import { WeatherActions } from '../component/widgets/weather/actions/WeatherActions';
import {
  CoordinateConverterActions
} from '../component/widgets/coordinateConverter/actions/CoordinateConverterActions';
import { ProfileActions } from '../profile/ProfileActions';
import { InformationActions } from '../component/card/information/actions/InformationActions';
import { OperationActions } from '../component/card/operation/actions/OperationActions';
import { MetricsPageActions } from '../page/actions/MetricsPageActions';
import { MetricActions } from '../component/metrics/metric/MetricActions';

const adminActions = new AdminActions(stores, WebRepositories);
const acronymActions = new AcronymActions(stores, WebRepositories);
const coordinateConverterActions = new CoordinateConverterActions(stores);
const profileActions = new ProfileActions(stores, WebRepositories);
const resourceActions = new ResourceActions(stores, WebRepositories);
const timeActions = new TimeActions(stores, WebRepositories);
const weatherActions = new WeatherActions(stores, WebRepositories);
const informationActions = new InformationActions(stores, WebRepositories);
const operationActions = new OperationActions(stores, WebRepositories);
const metricsPageActions = new MetricsPageActions(stores, WebRepositories);
const metricActions = new MetricActions(stores, WebRepositories);

export const actions = {
  acronymActions,
  adminActions,
  coordinateConverterActions,
  profileActions,
  resourceActions,
  timeActions,
  weatherActions,
  informationActions,
  operationActions,
  metricsPageActions,
  metricActions
};