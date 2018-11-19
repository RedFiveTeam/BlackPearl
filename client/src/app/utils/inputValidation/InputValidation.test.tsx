import { InputValidation } from './InputValidation';

describe('InputValidation', () => {
  let subject: InputValidation;

  beforeEach(() => {
    subject = new InputValidation();
  });

  it('should only pass valid urls', () => {
    expect(subject.isURLValid('https://www.google.com')).toBeTruthy();
    expect(subject.isURLValid('http://www.google.com')).toBeTruthy();
    expect(subject.isURLValid('www.google.com')).toBeFalsy();
    expect(subject.isURLValid('<script>')).toBeFalsy();
    expect(subject.isURLValid('javascript:alert("lul");')).toBeFalsy();
  });

  it('should only pass valid hostnames', () => {
    expect(subject.isHostnameValid('https://muhj-fs-dgs1')).toBeTruthy();
    expect(subject.isHostnameValid('https://abc-def:9090/test')).toBeTruthy();
    expect(subject.isHostnameValid('https://abc123:9090')).toBeTruthy();
    expect(subject.isHostnameValid('<script>')).toBeFalsy();
    expect(subject.isHostnameValid('javascript:alert("lul");')).toBeFalsy();
  });

  it('should only pass valid resource urls', () => {
    expect(subject.isResourceValid('http://muhj-fs-dgs1:9090/test')).toBeTruthy();
    expect(subject.isResourceValid('http://www.google.com')).toBeTruthy();
    expect(subject.isResourceValid('javascript:alert("lul");')).toBeFalsy();
  });

  it('should only pass valid mgrs', () => {
    expect(subject.isMGRSValid('traaash')).toBeFalsy();
    expect(subject.isMGRSValid('18SUG74081064')).toBeTruthy();
    expect(subject.isMGRSValid('18SUG7408106474')).toBeTruthy();
    expect(subject.isMGRSValid('18SUG740810647')).toBeFalsy();
  });
});