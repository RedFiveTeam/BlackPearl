import { ResourceActions } from '../resource/actions/ResourceActions';
import { stores } from './Stores';
import { WebRepositories } from './Repositories';
import { TimeActions } from './time/TimeActions';

const resourceActions = new ResourceActions(stores, WebRepositories);
const timeActions = new TimeActions(stores, WebRepositories);

export const actions = {
  resourceActions,
  timeActions
};