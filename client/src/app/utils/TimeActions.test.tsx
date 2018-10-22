import { TimeActions } from './TimeActions';

describe('TimeActions', () => {
  let subject: TimeActions;
  let timeStore: any;

  beforeEach(() => {
    timeStore = {
      setTime: jest.fn(),
      time: '2018-08-22T00:00:00Z'
    };
    subject = new TimeActions({timeStore} as any);
  });

  it('should return correct ATO Day', () => {
    expect(subject.returnATODay()).toMatch(/ATO AA/);
    timeStore.time = '2018-10-22T00:00:00Z';
    expect(subject.returnATODay()).toMatch(/ATO CJ/);
    timeStore.time = '2020-06-27T00:00:00Z';
    expect(subject.returnATODay()).toMatch(/ATO ZZ/);
    timeStore.time = '2020-06-28T00:00:00Z';
    expect(subject.returnATODay()).toMatch(/ATO AA/);
    timeStore.time = '2020-06-29T00:00:00Z';
    expect(subject.returnATODay()).toMatch(/ATO AB/);
  });

  it('should return the time for a given timezone', () => {
    expect(subject.returnCurrentTime(timeStore.time, 'America/Los_Angeles')).toBe('1700');
    expect(subject.returnCurrentTime(timeStore.time, 'Asia/Magadan')).toBe('1100');
    expect(subject.returnCurrentTime(timeStore.time, 'America/New_York')).toBe('2000');
    expect(subject.returnCurrentTime(timeStore.time, 'Asia/Riyadh')).toBe('0300');
    expect(subject.returnCurrentTime(timeStore.time)).toBe('0000');
  });

  it('should update time in TimeStore', () => {
    subject.setCurrentTime();
    expect(timeStore.setTime).toHaveBeenCalled();
  });
});