import { CoordinateConverterStore } from './CoordinateConverterStore';

describe('CoordinateConverterStore', () => {
  let subject: CoordinateConverterStore;

  beforeEach(() => {
    subject = new CoordinateConverterStore();
  });

  it('should convert user input to decimal', () => {
    let input = '37°5\'46.38"N 76°25\'1.02"W';
    expect(subject.convertToDecimal(input)).toEqual([-76.41694444, 37.09611111]);
    input = '370546N 0762501W';
    expect(subject.convertToDecimal(input)).toEqual([-76.41694444, 37.09611111]);
  });

  it('should convert decimal to mgrs and store mgrs', () => {
    subject.convertDecimalToMGRS([-76.41694444, 37.09611111]);
    expect(subject.mgrs).toEqual('18SUG7408106474');
  });

  it('should return 9-element array from regex', () => {
    const regex = subject.regex('37°5\'46.38"N 76°25\'1.02"W');
    expect(regex!.length).toBe(9);
    const expectedRegex = [
      '37°5\'46.38"N 76°25\'1.02"W',
      '37', '5', '46.38', 'N',
      '76', '25', '1.02', 'W'
    ];
    regex!.forEach((element, index) => expect(element).toEqual(expectedRegex[index]));
  });
});