import { ResourceActions } from '../resource/actions/ResourceActions';
import { stores } from './Stores';
import { WebRepositories } from './Repositories';

const resourceActions = new ResourceActions(stores, WebRepositories);

export const actions = {
  resourceActions,
};