import { InputValidation } from './InputValidation';

describe('InputValidation', () => {
  let subject: InputValidation;

  beforeEach(() => {
    subject = new InputValidation();
  });

  it('should alert for invalid urls', () => {
    expect(subject.isURLValid('https://www.google.com')).toBeTruthy();
    expect(subject.isURLValid('http://www.google.com')).toBeTruthy();
    expect(subject.isURLValid('www.google.com')).toBeFalsy();
    expect(subject.isURLValid('<script>')).toBeFalsy();
    expect(subject.isURLValid('javascript:alert("lul");')).toBeFalsy();
  });

  it('should alert for invalid mgrs', () => {
    expect(subject.isMGRSValid('traaash')).toBeFalsy();
    expect(subject.isMGRSValid('18SUG74081064')).toBeTruthy();
    expect(subject.isMGRSValid('18SUG7408106474')).toBeTruthy();
    expect(subject.isMGRSValid('18SUG740810647')).toBeFalsy();
  });
});