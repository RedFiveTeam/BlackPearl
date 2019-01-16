import { action } from 'mobx';
import { Stores } from '../../../utils/Stores';
import { MeasurementConverterStore } from './MeasurementConverterStore';

export class MeasurementConverterActions {
  private measurementConverterStore: MeasurementConverterStore;

  constructor(stores: Partial<Stores>) {
    this.measurementConverterStore = stores.measurementConverterStore!;
  }

  @action.bound
  convertInputToFeet(inputMeasurement: number) {
    if (isNaN(inputMeasurement)) {
      return '';
    }
    this.measurementConverterStore.setInputConversionNumber(inputMeasurement);
    let conversionType = this.measurementConverterStore.typeOfConversion;
    let convertedValue: number;
    switch (conversionType) {
      case 'nm':
        convertedValue = inputMeasurement * 6076.1155;
        break;
      case 'mi':
        convertedValue = inputMeasurement * 5280;
        break;
      case 'm':
        convertedValue = inputMeasurement * 3.28084;
        break;
      case 'yd':
        convertedValue = inputMeasurement * 3;
        break;
      case 'km':
        convertedValue = inputMeasurement * 3280.84;
        break;
      default:
        convertedValue = inputMeasurement * 1;
        break;
    }
    return this.convertFeetToOutput(convertedValue!);
  }

  @action.bound
  convertFeetToOutput(convertedValue: number) {
    let finalConvertedValue: number;
    switch (this.measurementConverterStore.outputConversionUnit) {
      case 'nm':
        finalConvertedValue = convertedValue * 0.000164579;
        break;
      case 'mi':
        finalConvertedValue = convertedValue * 0.000189394;
        break;
      case 'm':
        finalConvertedValue = convertedValue * 0.3048;
        break;
      case 'yd':
        finalConvertedValue = convertedValue / 3;
        break;
      case 'km':
        finalConvertedValue = convertedValue * 0.0003048;
        break;
      default:
        finalConvertedValue = convertedValue * 1;
        break;
    }
    return finalConvertedValue.toFixed(2);
  }
}