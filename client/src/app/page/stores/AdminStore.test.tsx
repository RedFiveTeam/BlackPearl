import { TimeRepository } from '../../component/widgets/time/repositories/TimeRepository';
import { StubTimeRepository } from '../../component/widgets/time/repositories/StubTimeRepository';
import { AdminStore } from './AdminStore';
import { WeatherRepository } from '../../component/widgets/weather/repositories/WeatherRepository';
import { StubWeatherRepository } from '../../component/widgets/weather/repositories/StubWeatherRepository';

describe('AdminStore', () => {
  let subject: AdminStore;
  let timeRepository: TimeRepository;
  let weatherRepository: WeatherRepository;

  beforeEach(async () => {
    timeRepository = new StubTimeRepository();
    weatherRepository = new StubWeatherRepository();
    subject = new AdminStore();
    await subject.hydrate(timeRepository, weatherRepository);
  });

  it('should hydrate with all timezones', async () => {
    expect(subject.timezones.length).toBe(3);
  });

  it('should hydrate with the weather', async () => {
    expect(subject.weather[0].url).toBe('https://www.weather.com');
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
});