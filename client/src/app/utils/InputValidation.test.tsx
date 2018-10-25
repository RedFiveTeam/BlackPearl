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
});