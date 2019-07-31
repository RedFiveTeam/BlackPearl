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
import { OperationRepository } from '../component/card/operation/repositories/OperationRepository';
import { WebOperationRepository } from '../component/card/operation/repositories/WebOperationRepository';
import { StubOperationRepository } from '../component/card/operation/repositories/StubOperationRepository';
import { WebMetricRepository } from '../component/metrics/metric/WebMetricRepository';
import { StubMetricRepository } from '../component/metrics/metric/StubMetricRepository';
import { BlameRepository } from '../component/resource/blame/repositories/BlameRepository';
import { WebBlameRepository } from '../component/resource/blame/repositories/WebBlameRepository';
import { StubBlameRepository } from '../component/resource/blame/repositories/StubBlameRepository';
import { MetricRepository } from '../component/metrics/metric/MetricRepository';
import { ClassificationRepository } from '../component/classification/repositories/ClassificationRepository';
import { WebClassificationRepository } from '../component/classification/repositories/WebClassificationRepository';
import { StubClassificationRepository } from '../component/classification/repositories/StubClassificationRepository';

export interface Repositories {
  acronymRepository: AcronymRepository;
  profileRepository: ProfileRepository;
  resourceRepository: ResourceRepository;
  timeRepository: TimeRepository;
  weatherRepository: WeatherRepository;
  informationRepository: InformationRepository;
  operationRepository: OperationRepository;
  metricRepository: MetricRepository;
  blameRepository: BlameRepository;
  classificationRepository: ClassificationRepository;
}

const client = new HTTPClient();

export const WebRepositories: Repositories = Object.freeze({
  acronymRepository: new WebAcronymRepository(client),
  profileRepository: new WebProfileRepository(client),
  resourceRepository: new WebResourceRepository(client),
  timeRepository: new WebTimeRepository(client),
  weatherRepository: new WebWeatherRepository(client),
  informationRepository: new WebInformationRepository(client),
  operationRepository: new WebOperationRepository(client),
  metricRepository: new WebMetricRepository(client),
  blameRepository: new WebBlameRepository(client),
  classificationRepository: new WebClassificationRepository(client)
});

export const StubRepositories: Repositories = {
  acronymRepository: new StubAcronymRepository(),
  profileRepository: new StubProfileRepository(),
  resourceRepository: new StubResourceRepository(),
  timeRepository: new StubTimeRepository(),
  weatherRepository: new StubWeatherRepository(),
  informationRepository: new StubInformationRepository(),
  operationRepository: new StubOperationRepository(),
  metricRepository: new StubMetricRepository(),
  blameRepository: new StubBlameRepository(),
  classificationRepository: new StubClassificationRepository()
};