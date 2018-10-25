import { CoordinateConverterActions } from './CoordinateConverterActions';

describe('CoordinateConverterActions', () => {
  let subject: CoordinateConverterActions;
  let coordinateConverterStore: any;

  beforeEach(() => {
    coordinateConverterStore = {
      convertToDecimal: jest.fn(),
      convertDecimalToMGRS: jest.fn()
    };

    subject = new CoordinateConverterActions({coordinateConverterStore} as any);
  });

  it('should facilitate mgrs being saved in the store', () => {
    let input = '37°5\'46.38"N 76°25\'1.02"W';
    subject.convertToMGRS(input);
    expect(coordinateConverterStore.convertToDecimal).toHaveBeenCalledWith(input);
    expect(coordinateConverterStore.convertDecimalToMGRS).toHaveBeenCalled();
  });
});