import { Stores } from '../../../utils/Stores';
import { CoordinateConverterStore } from './CoordinateConverterStore';
import { action } from 'mobx';

export class CoordinateConverterActions {
  private coordinateConverterStore: CoordinateConverterStore;

  constructor(stores: Partial<Stores>) {
    this.coordinateConverterStore = stores.coordinateConverterStore!;
  }

  @action.bound
  convertToMGRS(input: string) {
    let decimal: number[] | null;
    decimal = this.coordinateConverterStore.convertToDecimal(input);
    this.coordinateConverterStore.convertDecimalToMGRS(decimal);
  }
}