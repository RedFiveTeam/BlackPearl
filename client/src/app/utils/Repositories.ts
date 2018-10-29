import { ResourceRepository } from '../resource/repositories/ResourceRepository';
import { WebResourceRepository } from '../resource/repositories/web/WebResourceRepository';
import { HTTPClient } from './HTTPClient';
import { StubResourceRepository } from '../resource/repositories/stub/StubResourceRepository';
import { TimeRepository } from './time/repositories/TimeRepository';
import { WebTimeRepository } from './time/repositories/WebTimeRepository';
import { StubTimeRepository } from './time/repositories/StubTimeRepository';
import { WebAcronymRepository } from '../component/widgets/acronym/repositories/WebAcronymRepository';
import { StubAcronymRepository } from '../component/widgets/acronym/repositories/StubAcronymRepository';
import { AcronymRepository } from '../component/widgets/acronym/repositories/AcronymRepository';
import { WebWeatherRepository } from '../component/widgets/weather/repositories/WebWeatherRepository';
import { StubWeatherRepository } from '../component/widgets/weather/repositories/StubWeatherRepository';
import { WeatherRepository } from '../component/widgets/weather/repositories/WeatherRepository';

export interface Repositories {
  acronymRepository: AcronymRepository;
  resourceRepository: ResourceRepository;
  timeRepository: TimeRepository;
  weatherRepository: WeatherRepository;
}

const client = new HTTPClient();

export const WebRepositories: Repositories = Object.freeze({
  acronymRepository: new WebAcronymRepository(client),
  resourceRepository: new WebResourceRepository(client),
  timeRepository: new WebTimeRepository(client),
  weatherRepository: new WebWeatherRepository(client)
});

export const StubRepositories: Repositories = {
  acronymRepository: new StubAcronymRepository(),
  resourceRepository: new StubResourceRepository(),
  timeRepository: new StubTimeRepository(),
  weatherRepository: new StubWeatherRepository()
};