import Mock = jest.Mock;
import { TimeRepository } from '../../component/widgets/time/repositories/TimeRepository';
import { StubTimeRepository } from '../../component/widgets/time/repositories/StubTimeRepository';
import { TimezoneModel } from '../../component/widgets/time/TimezoneModel';
import { AdminActions } from './AdminActions';
import { WeatherRepository } from '../../component/widgets/weather/repositories/WeatherRepository';
import { StubWeatherRepository } from '../../component/widgets/weather/repositories/StubWeatherRepository';
import { InformationRepository } from '../../component/card/information/repositories/InformationRepository';
import { StubInformationRepository } from '../../component/card/information/repositories/StubInformationRepository';
import { AcronymRepository } from '../../component/widgets/acronym/repositories/AcronymRepository';
import { StubAcronymRepository } from '../../component/widgets/acronym/repositories/StubAcronymRepository';
import { AcronymModel } from '../../component/widgets/acronym/AcronymModel';
import { BlameRepository } from '../../component/resource/blame/repositories/BlameRepository';
import { StubBlameRepository } from '../../component/resource/blame/repositories/StubBlameRepository';

describe('AdminActions', () => {
  let subject: AdminActions;
  let adminStore: any;
  let acronymRepository: AcronymRepository;
  let timeRepository: TimeRepository;
  let weatherRepository: WeatherRepository;
  let informationRepository: InformationRepository;
  let blameRepository: BlameRepository;
  let updateSpy: Mock;
  let saveSpy: Mock;

  beforeEach(() => {
    updateSpy = jest.fn();
    saveSpy = jest.fn();

    adminStore = {
      setTimezones: jest.fn(),
      setWeather: jest.fn(),
      setInformation: jest.fn(),
      pendingTimezones: [new TimezoneModel(1, 1, '1', '1'), new TimezoneModel(2, 2, '2', '2')],
      pendingWeather: [],
      pendingInformation: [],
      hydrate: jest.fn(),
      setPendingAcronym: jest.fn()
    };

    acronymRepository = new StubAcronymRepository();
    timeRepository = new StubTimeRepository();
    weatherRepository = new StubWeatherRepository();
    informationRepository = new StubInformationRepository();
    blameRepository = new StubBlameRepository();
    acronymRepository.saveAcronym = saveSpy;
    timeRepository.update = updateSpy;
    weatherRepository.update = updateSpy;
    informationRepository.update = updateSpy;

    subject = new AdminActions({adminStore} as any, {
      acronymRepository,
      timeRepository,
      weatherRepository,
      informationRepository,
      blameRepository
    } as any);
  });

  it('should initialize the time store with the repositories', async () => {
    await subject.initializeStores();
    expect(adminStore.hydrate).toHaveBeenCalledWith(
      acronymRepository,
      timeRepository,
      weatherRepository,
      informationRepository,
      blameRepository);
  });

  it('should use the repository to send timezones change requests', async () => {
    await subject.submitChanges();
    expect(updateSpy).toHaveBeenCalledWith((adminStore.pendingTimezones));
    expect(updateSpy).toHaveBeenCalledWith((adminStore.pendingWeather));
    expect(updateSpy).toHaveBeenCalledWith((adminStore.pendingInformation));
  });

  it('should update a pending acronym', () => {
    let pendingAcronym = new AcronymModel(null, 'AT', 'acronym title');
    subject.updatePendingAcronym(pendingAcronym.acronym, pendingAcronym.definition);
    expect(adminStore.setPendingAcronym.mock.calls[0][0].acronym).toEqual(pendingAcronym.acronym);
    expect(adminStore.setPendingAcronym.mock.calls[0][0].definition).toEqual(pendingAcronym.definition);
  });
});