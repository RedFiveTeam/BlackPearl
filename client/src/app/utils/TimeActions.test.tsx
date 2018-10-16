import { TimeActions } from './TimeActions';

describe('TimeActions', () => {
  let subject: TimeActions;
  let timeStore: any;

  beforeEach(() => {
    timeStore = {
      setTime: jest.fn(),
      time: '2018-01-01T00:00:00Z'
    };
    subject = new TimeActions({timeStore} as any);
  });

  it('should return correct ATO Day', () => {
    expect(subject.returnATODay()).toMatch(/ATO AA/);
  });

  it('should return the time for a given timezone', () => {
    expect(subject.returnCurrentTime(timeStore.time, 'America/Los_Angeles')).toBe('1600');
    expect(subject.returnCurrentTime(timeStore.time, 'Asia/Magadan')).toBe('1100');
    expect(subject.returnCurrentTime(timeStore.time, 'America/New_York')).toBe('1900');
    expect(subject.returnCurrentTime(timeStore.time, 'Asia/Riyadh')).toBe('0300');
    expect(subject.returnCurrentTime(timeStore.time)).toBe('0000');
  });

  it('should update time in TimeStore', () => {
    subject.setCurrentTime();
    expect(timeStore.setTime).toHaveBeenCalled();
  });
});