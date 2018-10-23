import { TimeRepository } from '../utils/time/repositories/TimeRepository';
import { StubTimeRepository } from '../utils/time/repositories/StubTimeRepository';
import { AdminStore } from './AdminStore';

describe('AdminStore', () => {
  let subject: AdminStore;
  let timeRepository: TimeRepository;

  beforeEach(async () => {
    timeRepository = new StubTimeRepository();
    subject = new AdminStore();
    await subject.hydrate(timeRepository);
  });

  it('should hydrate with all timezones', async () => {
    expect(subject.timezones.length).toBe(3);
  });

  it('should update the timezone zone from action', () => {
    subject.setTimezoneZone(0, 'Zulu');
    expect(subject.timezones[0].zone).toBe('Zulu');
  });

  it('should update the timezone friendly with index and text', () => {
    subject.setTimezoneName(0, 'Friendly');
    expect(subject.timezones[0].name).toBe('Friendly');
  });
});