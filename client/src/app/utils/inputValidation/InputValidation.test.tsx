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
    expect(subject.isValidResource('http://muhj-fs-dgs1:9090/test')).toBeTruthy();
    expect(subject.isValidResource('http://www.google.com')).toBeTruthy();
    expect(subject.isValidResource('javascript:alert("lul");')).toBeFalsy();
  });

  it('should only pass valid mgrs', () => {
    expect(subject.isMGRSValid('traaash')).toBeFalsy();
    expect(subject.isMGRSValid('18SUG74081064')).toBeTruthy();
    expect(subject.isMGRSValid('18SUG7408106474')).toBeTruthy();
    expect(subject.isMGRSValid('18SUG740810647')).toBeFalsy();
  });

  it('should pass when the path is local', () => {
    expect(subject.isLocal('Y:/This/Is/A/Folder/')).toBeTruthy();
    expect(subject.isLocal('Y:\\This\\Is\\A\\Folder\\')).toBeTruthy();
    expect(subject.isLocal('\\\\abc-de-abc1\\This\\Is\\A\\Folder\\')).toBeTruthy();
    expect(subject.isLocal('//abc-de-abc1/This/Is/A/Folder/')).toBeTruthy();
    expect(subject.isLocal('//abc-de-abc1/This/Is/A/Folder with a space/')).toBeTruthy();
    expect(subject.isLocal('Y:/This/Is/Not/A/Folder.txt')).toBeTruthy();
    expect(subject.isLocal('//abc-de-abc1/This/Is/Not/A/Folder.txt')).toBeTruthy();
    expect(subject.isLocal('file://C:/This/Is/Not/A/Folder.txt')).toBeTruthy();
    expect(subject.isLocal('file:///lfi-fs-dhs1/This/Is/Not/A/Folder.txt')).toBeTruthy();
    expect(subject.isLocal('file:///lfi-fs-dhs1/This/Is/Not/A/Folder with a space.txt')).toBeTruthy();
  });
});