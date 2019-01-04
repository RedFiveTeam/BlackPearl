import { TimeRepository } from '../../component/widgets/time/repositories/TimeRepository';
import { StubTimeRepository } from '../../component/widgets/time/repositories/StubTimeRepository';
import { AdminStore } from './AdminStore';
import { WeatherRepository } from '../../component/widgets/weather/repositories/WeatherRepository';
import { StubWeatherRepository } from '../../component/widgets/weather/repositories/StubWeatherRepository';
import { InformationRepository } from '../../component/card/information/repositories/InformationRepository';
import { StubInformationRepository } from '../../component/card/information/repositories/StubInformationRepository';
import { AcronymRepository } from '../../component/widgets/acronym/repositories/AcronymRepository';
import { StubAcronymRepository } from '../../component/widgets/acronym/repositories/StubAcronymRepository';
import { StubBlameRepository } from '../../component/resource/blame/repositories/StubBlameRepository';
import { BlameRepository } from '../../component/resource/blame/repositories/BlameRepository';

describe('AdminStore', () => {
  let subject: AdminStore;
  let acronymRepository: AcronymRepository;
  let timeRepository: TimeRepository;
  let weatherRepository: WeatherRepository;
  let informationRepository: InformationRepository;
  let blameRepository: BlameRepository;

  beforeEach(async () => {
    acronymRepository = new StubAcronymRepository();
    timeRepository = new StubTimeRepository();
    weatherRepository = new StubWeatherRepository();
    informationRepository = new StubInformationRepository();
    blameRepository = new StubBlameRepository();
    subject = new AdminStore();
    await subject.hydrate(acronymRepository, informationRepository, timeRepository, weatherRepository, blameRepository);
  });

  it('should hydrate with all timezones', async () => {
    expect(subject.timezones.length).toBe(3);
  });

  it('should hydrate with the weather', async () => {
    expect(subject.weather[0].url).toBe('https://www.weather.com');
  });

  it('should hydrate with all the general information', async () => {
    expect(subject.information[0].name).toBe('Phone Number');
    expect(subject.information[0].content).toBe('123-456-7890');
  });

  it('should hydrate with all the blame information', () => {
    expect(subject.blames[0].action).toBe('ADD');
  });

  it('should update the timezone name and zone', () => {
    subject.setPendingTimezoneName(0, 'Friendly');
    subject.setPendingTimezoneZone(0, 'Etc/UTC');
    expect(subject.pendingTimezones[0].name).toBe('Friendly');
    expect(subject.pendingTimezones[0].zone).toBe('Etc/UTC');
  });

  it('should update the weather name url', () => {
    subject.setPendingWeatherLabel(0, 'NotAPlace');
    subject.setPendingWeatherUrl(0, 'https://www.notWeather.com');
    expect(subject.pendingWeather[0].url).toBe('https://www.notWeather.com');
    expect(subject.pendingWeather[0].label).toBe('NotAPlace');
  });

  it('should update the information content', () => {
    subject.setPendingInformationContent(0, '098-765-4321');
    expect(subject.pendingInformation[0].content).toBe('098-765-4321');
  });
});