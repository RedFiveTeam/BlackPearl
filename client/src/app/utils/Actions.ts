import { ResourceActions } from '../resource/actions/ResourceActions';
import { stores } from './Stores';
import { WebRepositories } from './Repositories';
import { TimeActions } from './TimeActions';

const resourceActions = new ResourceActions(stores, WebRepositories);
const timeActions = new TimeActions(stores);

export const actions = {
  resourceActions,
  timeActions
};