import { action, computed, observable } from 'mobx';
import { InputValidation } from '../../../../utils/inputValidation/InputValidation';

const mgrsConverter = require('mgrs');

// Coordinates: [12.12345, 123.12345]
// LatLong: [123456N, 1234567E]
// MGRS: 18SUG7408106486

export class CoordinateConverterStore {
  @observable private _mgrs: string;
  @observable private _latLong: string;

  @action.bound
  parseAsCoordinates(input: string): number[] | null {
    let regexOutput: RegExpExecArray | null;
    regexOutput = this.regex(input);
    if (regexOutput && regexOutput.length === 9) {
      return [this.convertToCoordinate(regexOutput.slice(5, 9)), this.convertToCoordinate(regexOutput.slice(1, 5))];
    }
    return null;
  }

  @action.bound
  convertMGRSToLatLong(mgrs: string) {
    let valid = new InputValidation();
    this._latLong = valid.isMGRSValid(mgrs) ? this.convertCoordinatesToLatLong(mgrsConverter.toPoint(mgrs)) : '';
  }

  convertToCoordinate(input: string[]) {
    let degree = parseInt(input[0], 10);
    let minute = parseInt(input[1], 10);
    let second = parseFloat(input[2]);
    let cardinal = /[NE]/.exec(input[3]) ? '' : '-';
    return parseFloat(cardinal + (degree + (minute / 60) + (second / 3600)).toPrecision(10));
  }

  convertCoordinatesToLatLong(coordinates: number[]) {
    const latitude = this.convertCoordinateToLatitude(coordinates[1]);
    const longitude = this.convertCoordinateToLongitude(coordinates[0]);

    return latitude + ' ' + longitude;
  }

  convertCoordinateToLatitude(coordinate: number) {
    let degree = coordinate < 0 ? Math.abs(Math.ceil(coordinate)) : Math.abs(Math.floor(coordinate));
    let remainder = Math.abs(parseFloat((coordinate % 1).toPrecision(10)));
    let minute = Math.floor(remainder * 60);
    let second = Math.abs(Math.round((remainder - minute / 60) * 3600));
    let cardinal = coordinate < 0 ? 'S' : 'N';

    return this.padLeftZeros(degree, 2) + this.padLeftZeros(minute, 2) + this.padLeftZeros(second, 2) + cardinal;
  }

  convertCoordinateToLongitude(coordinate: number) {
    let degree = coordinate < 0 ? Math.abs(Math.ceil(coordinate)) : Math.abs(Math.floor(coordinate));
    let remainder = Math.abs(parseFloat((coordinate % 1).toPrecision(10)));
    let minute = Math.floor(remainder * 60);
    let second = Math.abs(Math.round((remainder - minute / 60) * 3600));
    let cardinal = coordinate < 0 ? 'W' : 'E';

    return this.padLeftZeros(degree, 3) + this.padLeftZeros(minute, 2) + this.padLeftZeros(second, 2) + cardinal;
  }

  padLeftZeros(num: number, newLength: number) {
    let padded = '0000000000000' + num;
    return (padded).substr(padded.length - newLength, newLength);
  }

  regex(input: string) {
    const regex = new RegExp([
      '^(\\d{1,2})°?\\s?(\\d{1,2})\'?\\s?(\\d{1,2}\\.?\\d{0,2})"?\\s?([NS])',
      '\\s?(\\d{1,3})°?\\s?(\\d{1,2})\'?\\s?(\\d{1,2}\\.?\\d{0,2})"?\\s?([EW])$'
    ].join(''));
    return regex.exec(input);
  }

  @action.bound
  convertCoordinatesToMGRS(coordinates: number[] | null) {
    coordinates ? this.setMGRS(mgrsConverter.forward(coordinates, 10)) : this.setMGRS('');
  }

  @action.bound
  setMGRS(mgrs: string) {
    this._mgrs = mgrs;
  }

  @action.bound
  setLatLong(input: string) {
    this._latLong = input;
  }

  @computed
  get latLong() {
    return this._latLong;
  }

  @computed
  get mgrs() {
    return this._mgrs;
  }
}