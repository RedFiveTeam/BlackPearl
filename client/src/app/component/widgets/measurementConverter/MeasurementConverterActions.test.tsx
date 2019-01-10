import { MeasurementConverterActions } from './MeasurementConverterActions';

describe('MeasurementConverterActions', () => {
  let subject: MeasurementConverterActions;
  let measurementConverterStore: any;

  beforeEach(() => {
    measurementConverterStore = {
      setInputConversionNumber: jest.fn(),
      outputConversionUnit: 'ft',
      typeOfConversion: 'mi'
    };

    subject = new MeasurementConverterActions({measurementConverterStore} as any);
  });

  it('should convert any input to feet by default', () => {
    expect(subject.convertInputToFeet(1)).toBe('5280.00');
  });

  it('should convert nautical miles to feet', () => {
    measurementConverterStore.typeOfConversion = 'nm';
    expect(subject.convertInputToFeet(1)).toBe('6076.12');
  });

  it('should convert miles to feet', () => {
    measurementConverterStore.typeOfConversion = 'mi';
    expect(subject.convertInputToFeet(1)).toBe('5280.00');
  });

  it('should convert meters to feet', () => {
    measurementConverterStore.typeOfConversion = 'm';
    expect(subject.convertInputToFeet(1)).toBe('3.28');
  });

  it('should convert yards to feet', () => {
    measurementConverterStore.typeOfConversion = 'yd';
    expect(subject.convertInputToFeet(1)).toBe('3.00');
  });

  it('should convert kilometers to feet', () => {
    measurementConverterStore.typeOfConversion = 'km';
    expect(subject.convertInputToFeet(1)).toBe('3280.84');
  });
});
