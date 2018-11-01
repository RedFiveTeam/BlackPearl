import { TimeActions } from './TimeActions';
import { StubTimeRepository } from '../repositories/StubTimeRepository';
import moment = require('moment-timezone');

describe('TimeActions', () => {
  let subject: TimeActions;
  let timeStore: any;
  let timeRepository: any;

  beforeEach(() => {

    timeStore = {
      hydrate: jest.fn(),
      setTime: jest.fn(),
      setATODay: jest.fn(),
      setZones: jest.fn(),
      time: '2018-08-22T00:00:00Z',
    };

    timeRepository = new StubTimeRepository();

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
    const timeObj = await timeRepository.getTime();
    expect(timeStore.setTime).toHaveBeenCalledWith(moment(timeObj.timestamp, 'X').tz('Etc/UTC').format());
  });

  it('should update timezones in TimeStore', async () => {
    await subject.setTimezones();
    expect(timeStore.setZones).toHaveBeenCalled();
  });

});