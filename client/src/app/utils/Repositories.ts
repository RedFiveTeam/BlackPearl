import { ResourceRepository } from '../resource/repositories/ResourceRepository';
import { WebResourceRepository } from '../resource/repositories/web/WebResourceRepository';
import { HTTPClient } from './HTTPClient';
import { StubResourceRepository } from '../resource/repositories/stub/StubResourceRepository';

export interface Repositories {
  resourceRepository: ResourceRepository;
}

const client = new HTTPClient();

export const WebRepositories: Repositories = Object.freeze({
  resourceRepository: new WebResourceRepository(client)
});

export const StubRepositories: Repositories = {
  resourceRepository: new StubResourceRepository()
};