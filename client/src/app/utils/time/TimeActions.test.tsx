import { TimeActions } from './TimeActions';

describe('TimeActions', () => {
  let subject: TimeActions;
  let timeStore: any;
  let timeRepository: any;

  beforeEach(() => {
    timeStore = {
      setTime: jest.fn(),
      setATODay: jest.fn(),
      time: '2018-08-22T00:00:00Z'
    };

    timeRepository = {
      getTime: jest.fn()
    };
    subject = new TimeActions({timeStore} as any, {timeRepository} as any);
  });

  it('should return correct ATO Day', () => {
    subject.setATODay();
    expect(timeStore.setATODay).toHaveBeenCalledWith('ATO AA');
    timeStore.time = '2018-10-22T00:00:00Z';
    subject.setATODay();
    expect(timeStore.setATODay).toHaveBeenCalledWith('ATO CJ');
    timeStore.time = '2020-06-27T00:00:00Z';
    subject.setATODay();
    expect(timeStore.setATODay).toHaveBeenCalledWith('ATO ZZ');
    timeStore.time = '2020-06-28T00:00:00Z';
    subject.setATODay();
    expect(timeStore.setATODay).toHaveBeenCalledWith('ATO AA');
    timeStore.time = '2020-06-29T00:00:00Z';
    subject.setATODay();
    expect(timeStore.setATODay).toHaveBeenCalledWith('ATO AB');
  });

  it('should return the time for a given timezone', () => {
    expect(subject.returnCurrentTime(timeStore.time, 'America/Los_Angeles')).toBe('1700');
    expect(subject.returnCurrentTime(timeStore.time, 'Asia/Magadan')).toBe('1100');
    expect(subject.returnCurrentTime(timeStore.time, 'America/New_York')).toBe('2000');
    expect(subject.returnCurrentTime(timeStore.time, 'Asia/Riyadh')).toBe('0300');
    expect(subject.returnCurrentTime(timeStore.time)).toBe('0000');
  });

  it('should update time in TimeStore', async () => {
    await subject.setCurrentTime();
    expect(timeRepository.getTime).toHaveBeenCalled();
    expect(timeStore.setTime).toHaveBeenCalled();
  });
});