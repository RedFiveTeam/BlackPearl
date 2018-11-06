import { ResourceRepository } from '../component/resource/repositories/ResourceRepository';
import { WebResourceRepository } from '../component/resource/repositories/web/WebResourceRepository';
import { HTTPClient } from './HTTPClient';
import { StubResourceRepository } from '../component/resource/repositories/stub/StubResourceRepository';
import { TimeRepository } from '../component/widgets/time/repositories/TimeRepository';
import { WebTimeRepository } from '../component/widgets/time/repositories/WebTimeRepository';
import { StubTimeRepository } from '../component/widgets/time/repositories/StubTimeRepository';
import { WebAcronymRepository } from '../component/widgets/acronym/repositories/WebAcronymRepository';
import { StubAcronymRepository } from '../component/widgets/acronym/repositories/StubAcronymRepository';
import { AcronymRepository } from '../component/widgets/acronym/repositories/AcronymRepository';
import { WebWeatherRepository } from '../component/widgets/weather/repositories/WebWeatherRepository';
import { StubWeatherRepository } from '../component/widgets/weather/repositories/StubWeatherRepository';
import { WeatherRepository } from '../component/widgets/weather/repositories/WeatherRepository';
import { ProfileRepository } from '../profile/ProfileRepository';
import { WebProfileRepository } from '../profile/WebProfileRepository';
import { StubProfileRepository } from '../profile/StubProfileRepository';
import { InformationRepository } from '../component/card/information/repositories/InformationRepository';
import { WebInformationRepository } from '../component/card/information/repositories/WebInformationRepository';
import { StubInformationRepository } from '../component/card/information/repositories/StubInformationRepository';

export interface Repositories {
  acronymRepository: AcronymRepository;
  profileRepository: ProfileRepository;
  resourceRepository: ResourceRepository;
  timeRepository: TimeRepository;
  weatherRepository: WeatherRepository;
  informationRepository: InformationRepository;
}

const client = new HTTPClient();

export const WebRepositories: Repositories = Object.freeze({
  acronymRepository: new WebAcronymRepository(client),
  profileRepository: new WebProfileRepository(client),
  resourceRepository: new WebResourceRepository(client),
  timeRepository: new WebTimeRepository(client),
  weatherRepository: new WebWeatherRepository(client),
  informationRepository: new WebInformationRepository(client)
});

export const StubRepositories: Repositories = {
  acronymRepository: new StubAcronymRepository(),
  profileRepository: new StubProfileRepository(),
  resourceRepository: new StubResourceRepository(),
  timeRepository: new StubTimeRepository(),
  weatherRepository: new StubWeatherRepository(),
  informationRepository: new StubInformationRepository()
};