import { WeatherModel } from '../WeatherModel';
import { WeatherActions } from './WeatherActions';
import { StubWeatherRepository } from '../repositories/StubWeatherRepository';

describe('WeatherActions', () => {

  let weatherStore: any;
  let subject: WeatherActions;
  let testWeather: WeatherModel[];
  let weatherRepository: StubWeatherRepository;

  beforeEach(() => {
    weatherStore = {
      setWeather: jest.fn()
    };

    weatherRepository = {
      getWeather: jest.fn(),
      update: jest.fn()
    };

    testWeather = [new WeatherModel(1, 'https://testWeather.com', 'USA')];

    subject = new WeatherActions({weatherStore} as any, {weatherRepository} as any);
  });

  it('should set the weather in the store', async () => {
    await subject.setWeather(testWeather);
    expect(weatherStore.setWeather).toHaveBeenCalledWith(testWeather);
  });

  it('should store every weather in store', async () => {
    await subject.getWeather();
    expect(weatherStore.setWeather).toHaveBeenCalledWith(weatherRepository.getWeather());
  });
});