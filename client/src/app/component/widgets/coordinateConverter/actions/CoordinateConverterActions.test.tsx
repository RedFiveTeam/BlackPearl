import { CoordinateConverterActions } from './CoordinateConverterActions';

describe('CoordinateConverterActions', () => {
  let subject: CoordinateConverterActions;
  let coordinateConverterStore: any;

  beforeEach(() => {
    coordinateConverterStore = {
      parseAsCoordinates: jest.fn(),
      convertCoordinatesToMGRS: jest.fn(),
      convertMGRSToLatLong: jest.fn(),
      setLatLong: jest.fn(),
      setMGRS: jest.fn()
    };

    subject = new CoordinateConverterActions({coordinateConverterStore} as any);
  });

  it('should facilitate the store in converting from lat long to mgrs', () => {
    let input = '37°5\'46.38"N 76°25\'1.02"W';
    subject.convertToMGRS(input);
    expect(coordinateConverterStore.setLatLong).toHaveBeenCalledWith(input);
    expect(coordinateConverterStore.parseAsCoordinates).toHaveBeenCalledWith(input);
    expect(coordinateConverterStore.convertCoordinatesToMGRS).toHaveBeenCalled();
  });

  it('should facilitate the store in converting from mgrs to lat long', () => {
    let input = 'foo';
    subject.convertToLatLong(input);
    expect(coordinateConverterStore.setMGRS).toHaveBeenCalledWith(input);
    expect(coordinateConverterStore.convertMGRSToLatLong).toHaveBeenCalledWith(input);
  });
});