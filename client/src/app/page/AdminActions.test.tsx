import Mock = jest.Mock;
import { TimeRepository } from '../utils/time/repositories/TimeRepository';
import { StubTimeRepository } from '../utils/time/repositories/StubTimeRepository';
import { TimezoneModel } from '../utils/time/TimezoneModel';
import { AdminActions } from './AdminActions';

describe('AdminActions', () => {
  let subject: AdminActions;
  let adminStore: any;
  let timeRepository: TimeRepository;
  let updateSpy: Mock;

  beforeEach(() => {
    updateSpy = jest.fn();

    adminStore = {
      hydrate: jest.fn(),
      timezones: [new TimezoneModel(1, 1, '1', '1'), new TimezoneModel(2, 2, '2', '2') ]
    };

    timeRepository = new StubTimeRepository();
    timeRepository.update = updateSpy;

    subject = new AdminActions({adminStore} as any, {timeRepository} as any);
  });
  it('should initialize the time store with the repository', async () => {
    await subject.initializeTimeStore();
    expect(adminStore.hydrate).toHaveBeenCalledWith(timeRepository);
  });

  it('should use the repository to send timezones change requests', async () => {
    await subject.submitChanges();
    expect(updateSpy).toHaveBeenCalledWith((adminStore.timezones));
  });
});