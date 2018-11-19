import { TimeRepository } from '../../component/widgets/time/repositories/TimeRepository';
import { StubTimeRepository } from '../../component/widgets/time/repositories/StubTimeRepository';
import { AdminStore } from './AdminStore';
import { WeatherRepository } from '../../component/widgets/weather/repositories/WeatherRepository';
import { StubWeatherRepository } from '../../component/widgets/weather/repositories/StubWeatherRepository';
import { InformationRepository } from '../../component/card/information/repositories/InformationRepository';
import { StubInformationRepository } from '../../component/card/information/repositories/StubInformationRepository';
import { AcronymRepository } from '../../component/widgets/acronym/repositories/AcronymRepository';
import { StubAcronymRepository } from '../../component/widgets/acronym/repositories/StubAcronymRepository';

describe('AdminStore', () => {
  let subject: AdminStore;
  let acronymRepository: AcronymRepository;
  let timeRepository: TimeRepository;
  let weatherRepository: WeatherRepository;
  let informationRepository: InformationRepository;

  beforeEach(async () => {
    acronymRepository = new StubAcronymRepository();
    timeRepository = new StubTimeRepository();
    weatherRepository = new StubWeatherRepository();
    informationRepository = new StubInformationRepository();
    subject = new AdminStore();
    await subject.hydrate(acronymRepository, informationRepository, timeRepository, weatherRepository);
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

  it('should update the timezone zone from action', () => {
    subject.setTimezoneZone(0, 'Zulu');
    expect(subject.timezones[0].zone).toBe('Zulu');
  });

  it('should update the timezone friendly with index and text', () => {
    subject.setTimezoneName(0, 'Friendly');
    expect(subject.timezones[0].name).toBe('Friendly');
  });

  it('should update the weather url', () => {
    subject.setWeatherUrl(0, 'https://www.notWeather.com');
    expect(subject.weather[0].url).toBe('https://www.notWeather.com');
  });

  it('should update the information content', () => {
    subject.setInformationContent(0, '098-765-4321');
    expect(subject.information[0].content).toBe('098-765-4321');
  });
});