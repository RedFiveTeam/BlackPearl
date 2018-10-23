import { ResourceRepository } from '../resource/repositories/ResourceRepository';
import { WebResourceRepository } from '../resource/repositories/web/WebResourceRepository';
import { HTTPClient } from './HTTPClient';
import { StubResourceRepository } from '../resource/repositories/stub/StubResourceRepository';
import { TimeRepository } from './time/repositories/TimeRepository';
import { WebTimeRepository } from './time/repositories/WebTimeRepository';
import { StubTimeRepository } from './time/repositories/StubTimeRepository';

export interface Repositories {
  resourceRepository: ResourceRepository;
  timeRepository: TimeRepository;
}

const client = new HTTPClient();

export const WebRepositories: Repositories = Object.freeze({
  resourceRepository: new WebResourceRepository(client),
  timeRepository: new WebTimeRepository(client)
});

export const StubRepositories: Repositories = {
  resourceRepository: new StubResourceRepository(),
  timeRepository: new StubTimeRepository()
};