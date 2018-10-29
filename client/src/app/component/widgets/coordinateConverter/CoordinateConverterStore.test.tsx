import { CoordinateConverterStore } from './CoordinateConverterStore';

describe('CoordinateConverterStore', () => {
  let subject: CoordinateConverterStore;

  beforeEach(() => {
    subject = new CoordinateConverterStore();
  });

  it('should convert user input to decimal', () => {
    let input = '37°5\'46.38"N 76°25\'1.02"W';
    expect(subject.parseAsCoordinates(input)).toEqual([-76.416950, 37.09621667]);
    input = '370546N 0762501W'; // Decimal seconds removed, should be different
    expect(subject.parseAsCoordinates(input)).toEqual([-76.41694444, 37.09611111]);
  });

  it('should convert decimal to mgrs and store mgrs', () => {
    subject.convertCoordinatesToMGRS([-76.41694444, 37.09611111]);
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

    const regex2 = subject.regex('25°49\'2.88"S 150°54\'19.69"E');
    expect(regex2!.length).toBe(9);
    const expectedRegex2 = [
      '25°49\'2.88"S 150°54\'19.69"E',
      '25', '49', '2.88', 'S',
      '150', '54', '19.69', 'E'
    ];
    regex2!.forEach((element, index) => expect(element).toEqual(expectedRegex2[index]));
  });

  it('should convert string to coordinate', () => {
    expect(subject.convertToCoordinate(['37', '5', '46.38', 'N'])).toBe(37.09621667);
  });

  it('should convert MGRS to lat/long and store', () => {
    subject.convertMGRSToLatLong('18SUG7408106486');
    expect(subject.latLong).toBe('370546N 0762501W');
  });

  it('should convert coordinates to lat long string', () => {
    expect(subject.convertCoordinatesToLatLong([-76.41694444, 37.09611111])).toBe('370546N 0762501W');
  });

  it('should convert coordinate to longitude', () => {
    expect(subject.convertCoordinateToLongitude(-176.71694444)).toBe('1764301W');
    expect(subject.convertCoordinateToLongitude(-76.41694444)).toBe('0762501W');
    expect(subject.convertCoordinateToLongitude(76.41694444)).toBe('0762501E');
    expect(subject.convertCoordinateToLongitude(176.88888888)).toBe('1765320E');
  });

  it('should convert coordinate to latitude', () => {
    expect(subject.convertCoordinateToLatitude(-76.88888888)).toBe('765320S');
    expect(subject.convertCoordinateToLatitude(-76.44444444)).toBe('762640S');
    expect(subject.convertCoordinateToLatitude(76.44444444)).toBe('762640N');
    expect(subject.convertCoordinateToLatitude(76.88888888)).toBe('765320N');
  });

  it('should pad numbers with left zeros', () => {
    expect(subject.padLeftZeros(1, 2)).toBe('01');
    expect(subject.padLeftZeros(22, 2)).toBe('22');
    expect(subject.padLeftZeros(333, 3)).toBe('333');
  });
});