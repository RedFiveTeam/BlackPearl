import { action, computed, observable } from 'mobx';

export class CoordinateConverterStore {
  @observable private _mgrs: string;

  @action.bound
  convertToDecimal(input: string): number[] | null {
    let regexOutput: RegExpExecArray | null;
    regexOutput = this.regex(input);
    if (regexOutput && regexOutput.length === 9) {
      let latDegree = parseInt(regexOutput[1], 10);
      let latMinute = parseInt(regexOutput[2], 10);
      let latSecond = parseInt(regexOutput[3], 10);
      let latCardinal = regexOutput[4] === 'N' ? '' : '-';

      let longDegree = parseInt(regexOutput[5], 10);
      let longMinute = parseInt(regexOutput[6], 10);
      let longSecond = parseInt(regexOutput[7], 10);
      let longCardinal = regexOutput[8] === 'E' ? '' : '-';

      let latDecimal = latCardinal + (latDegree + (latMinute / 60) + (latSecond / 3600)).toPrecision(10);
      let longDecimal = longCardinal + (longDegree + (longMinute / 60) + (longSecond / 3600)).toPrecision(10);

      return [parseFloat(longDecimal), parseFloat(latDecimal)];
    }
    return null;
  }

  regex(input: string) {
    const regex = new RegExp([
      '^(\\d{1,2})°?\\s?(\\d{1,2})\'?\\s?(\\d{2}\\.?\\d{0,2})"?\\s?([NS])',
      '\\s?(\\d{1,3})°?\\s?(\\d{1,2})\'?\\s?(\\d{1,2}\\.?\\d{0,2})"?\\s?([EW])$'
    ].join(''));
    return regex.exec(input);
  }

  @action.bound
  convertDecimalToMGRS(decimal: number[] | null) {
    const mgrs = require('mgrs');
    decimal ? this.setMGRS(mgrs.forward(decimal, 10)) : this.setMGRS('');
  }

  @action.bound
  setMGRS(mgrs: string) {
    this._mgrs = mgrs;
  }

  @computed
  get mgrs() {
    return this._mgrs;
  }
}