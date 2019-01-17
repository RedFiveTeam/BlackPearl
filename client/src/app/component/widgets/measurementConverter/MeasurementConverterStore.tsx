import { action, computed, observable } from 'mobx';

export class MeasurementConverterStore {
  @observable private _measurementResults: number | null = null;
  @observable private _inputConversionNumber: number;
  @observable private _typeOfConversion: string = 'km';
  @observable private _outputConversionUnit: string = 'mi';

  @action.bound
  setTypeOfConversion(value: string) {
    this._typeOfConversion = value;
  }

  @action.bound
  setMeasurementResults(value: number | null) {
    this._measurementResults = value;
  }

  @action.bound
  setInputConversionNumber(value: number) {
    this._inputConversionNumber = value;
  }

  @action.bound
  setOutputConversionUnit(value: string) {
    this._outputConversionUnit = value;
  }

  @computed
  get typeOfConversion(): string {
    return this._typeOfConversion;
  }

  @computed
  get inputConversionNumber(): number {
    return this._inputConversionNumber;
  }

  @computed
  get measurementResults(): number | null {
    return this._measurementResults;
  }

  @computed
  get outputConversionUnit(): string {
    return this._outputConversionUnit;
  }
}