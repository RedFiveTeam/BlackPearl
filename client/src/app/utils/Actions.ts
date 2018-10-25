import { ResourceActions } from '../resource/actions/ResourceActions';
import { stores } from './Stores';
import { WebRepositories } from './Repositories';
import { TimeActions } from './time/TimeActions';
import { AdminActions } from '../page/AdminActions';
import { AcronymActions } from '../component/widgets/acronym/AcronymActions';
import { CoordinateConverterActions } from '../component/widgets/coordinateConverter/CoordinateConverterActions';

const adminActions = new AdminActions(stores, WebRepositories);
const acronymActions = new AcronymActions(stores, WebRepositories);
const coordinateConverterActions = new CoordinateConverterActions(stores);
const resourceActions = new ResourceActions(stores, WebRepositories);
const timeActions = new TimeActions(stores, WebRepositories);

export const actions = {
  acronymActions,
  adminActions,
  coordinateConverterActions,
  resourceActions,
  timeActions
};