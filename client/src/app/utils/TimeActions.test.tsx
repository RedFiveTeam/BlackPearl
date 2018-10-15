import { TimeActions } from './TimeActions';

describe('TimeActions', () => {
  let subject: TimeActions;

  beforeEach(() => {
    subject = new TimeActions();
  });

  it('should return correct ATO Day', () => {
    expect(subject.returnATODay(1)).toBe('ATO AA');
    expect(subject.returnATODay(2)).toBe('ATO AB');
    expect(subject.returnATODay(25)).toBe('ATO AY');
    expect(subject.returnATODay(26)).toBe('ATO AZ');
    expect(subject.returnATODay(27)).toBe('ATO BA');
    expect(subject.returnATODay(52)).toBe('ATO BZ');
    expect(subject.returnATODay()).toMatch(/ATO [A-Z]{2}/);
  });

});