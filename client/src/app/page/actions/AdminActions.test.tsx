import Mock = jest.Mock;
import { TimeRepository } from '../../component/widgets/time/repositories/TimeRepository';
import { StubTimeRepository } from '../../component/widgets/time/repositories/StubTimeRepository';
import { TimezoneModel } from '../../component/widgets/time/TimezoneModel';
import { AdminActions } from './AdminActions';
import { WeatherRepository } from '../../component/widgets/weather/repositories/WeatherRepository';
import { StubWeatherRepository } from '../../component/widgets/weather/repositories/StubWeatherRepository';
import { InformationRepository } from '../../component/card/information/repositories/InformationRepository';
import { StubInformationRepository } from '../../component/card/information/repositories/StubInformationRepository';

describe('AdminActions', () => {
  let subject: AdminActions;
  let adminStore: any;
  let timeRepository: TimeRepository;
  let weatherRepository: WeatherRepository;
  let informationRepository: InformationRepository;
  let updateSpy: Mock;

  beforeEach(() => {
    updateSpy = jest.fn();

    adminStore = {
      hydrate: jest.fn(),
      timezones: [new TimezoneModel(1, 1, '1', '1'), new TimezoneModel(2, 2, '2', '2') ]
    };

    timeRepository = new StubTimeRepository();
    weatherRepository = new StubWeatherRepository();
    informationRepository = new StubInformationRepository();
    timeRepository.update = updateSpy;
    weatherRepository.update = updateSpy;
    informationRepository.update = updateSpy;

    subject = new AdminActions({adminStore} as any, {timeRepository, weatherRepository, informationRepository} as any);
  });

  it('should initialize the time store with the repositories', async () => {
    await subject.initializeStores();
    expect(adminStore.hydrate).toHaveBeenCalledWith(timeRepository, weatherRepository, informationRepository);
  });

  it('should use the repository to send timezones change requests', async () => {
    await subject.submitChanges();
    expect(updateSpy).toHaveBeenCalledWith((adminStore.timezones));
  });

  it('should use the repository to send weather change request', async () => {
    await subject.submitChanges();
    expect(updateSpy).toHaveBeenCalledWith((adminStore.weather));
  });
});