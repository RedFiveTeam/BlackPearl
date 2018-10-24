import { ResourceActions } from '../resource/actions/ResourceActions';
import { stores } from './Stores';
import { WebRepositories } from './Repositories';
import { TimeActions } from './time/TimeActions';
import { AcronymActions } from '../component/widgets/acronym/AcronymActions';

const acronymActions = new AcronymActions(stores, WebRepositories);
const resourceActions = new ResourceActions(stores, WebRepositories);
const timeActions = new TimeActions(stores, WebRepositories);

export const actions = {
  acronymActions,
  resourceActions,
  timeActions
};