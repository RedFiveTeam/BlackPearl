import { Stores } from '../../../../utils/Stores';
import { CoordinateConverterStore } from '../store/CoordinateConverterStore';
import { action } from 'mobx';

export class CoordinateConverterActions {
  private coordinateConverterStore: CoordinateConverterStore;

  constructor(stores: Partial<Stores>) {
    this.coordinateConverterStore = stores.coordinateConverterStore!;
  }

  @action.bound
  convertToMGRS(input: string) {
    this.coordinateConverterStore.setLatLong(input);
    let decimal: number[] | null;
    decimal = this.coordinateConverterStore.parseAsCoordinates(input);
    this.coordinateConverterStore.convertCoordinatesToMGRS(decimal);
  }

  @action.bound
  convertToLatLong(input: string) {
    this.coordinateConverterStore.setMGRS(input);
    this.coordinateConverterStore.convertMGRSToLatLong(input);
  }
}