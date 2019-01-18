import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { MetricActions } from '../../metrics/metric/MetricActions';
import { LogableActions } from '../../metrics/metric/MetricModel';
import { DropdownIcon } from '../../../icon/DropdownIcon';
import { MeasurementConverterStore } from './MeasurementConverterStore';

interface Props {
  className?: string;
  conversionNumber: number;
  metricActions?: MetricActions;
  convertFunction: (e: any) => void;
  measurementConverterStore?: MeasurementConverterStore;
}

interface State {
  placeholder: string;
}

@observer
export class MeasurementConverter extends React.Component<Props, State> {
  state = {placeholder: 'Kilometers'};

  node: any = this.node;

  componentDidMount() {
    document.addEventListener('click', this.handleClick);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick);
  }

  handleClick = (e: any) => {
    let dd = document.querySelectorAll('.dd');
    for (let i = 0; i < dd.length; i++) {
      if ((dd[i] as HTMLElement).parentNode!.firstChild !== e.target) {
        let el = (dd[i] as HTMLElement);
        if (el) {
          el.style.display = 'none';
        }
      }
    }
  };

  optionSelect = (e: any) => {
    this.setState({placeholder: e.target.innerHTML});
    (document.querySelector('button') as HTMLButtonElement).innerText = e.target.dataset.abbrev.toUpperCase();
    this.props.measurementConverterStore!.setTypeOfConversion(e.target.dataset.abbrev);
    let el = (document.querySelectorAll('.dd')[0] as HTMLElement);
    if (el) {
      el.style.display = 'none';
    }
    (e.target as HTMLElement).classList.add('selected');
    let options = document.querySelectorAll('.ddd');
    for (let i = 0; i < options.length; i++) {
      if (options[i] !== e.target) {
        (options[i] as HTMLElement).classList.remove('selected');
      }
    }
    this.props.convertFunction(e);
  };

  outputSelect = (e: any) => {
    (document.querySelectorAll('.b')[1] as HTMLButtonElement).innerText = e.target.dataset.abbrev.toUpperCase();
    this.props.measurementConverterStore!.setOutputConversionUnit((e.target as HTMLElement).dataset.abbrev as string);
    let el = (document.querySelectorAll('.dd')[1] as HTMLElement);
    if (el) {
      el.style.display = 'none';
    }
    (e.target as HTMLElement).classList.add('selected');
    let options = document.querySelectorAll('.outputOption');
    for (let i = 0; i < options.length; i++) {
      if (options[i] !== e.target) {
        (options[i] as HTMLElement).classList.remove('selected');
      }
    }
    this.props.convertFunction(
      {e: {target: {value: (document.querySelector('.conversionInput') as HTMLInputElement).value}}}
    );
  };

  render() {
    return (
      <div
        className={this.props.className}
      >
        <div className="title">Measurement Converter</div>
        <div className="row">
          <input
            type="number"
            className="conversionInput"
            placeholder={this.state.placeholder}
            onClick={async () =>
              await this.props.metricActions!.logMetric(LogableActions.CLICK_MEASUREMENT, 'Convert Measurement')}
            onChange={
              (e: any) => {
                this.props.measurementConverterStore!.setInputConversionNumber(e.target.value);
                this.props.convertFunction(e);
              }}
          />
          <div className="spacer"/>
          <div className="d">
            <button
              className="b"
              onClick={() => {
                let el = (document.querySelectorAll('.dd')[0] as HTMLElement);
                if (el) {
                  el.style.display = 'block';
                }
              }}
            >
              KM
            </button>
            <DropdownIcon/>
            <div className="dd">
              <div
                onClick={this.optionSelect}
                className="ddd"
                data-abbrev="nm"
              >
                Nautical Miles
              </div>
              <div
                className="ddd"
                onClick={this.optionSelect}
                data-abbrev="mi"
              >
                Miles
              </div>
              <div
                className="ddd"
                onClick={this.optionSelect}
                data-abbrev="km"
              >
                Kilometers
              </div>
              <div
                className="ddd"
                onClick={this.optionSelect}
                data-abbrev="m"
              >
                Meters
              </div>
              <div
                className="ddd"
                onClick={this.optionSelect}
                data-abbrev="yd"
              >
                Yards
              </div>
              <div
                className="ddd"
                onClick={this.optionSelect}
                data-abbrev="ft"
              >
                Feet
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <input
            type="number"
            className="conversionOutput"
            disabled={true}
            onClick={async () =>
              await this.props.metricActions!.logMetric(LogableActions.CLICK_MEASUREMENT, 'Convert Measurement')}
            onChange={this.props.convertFunction}
          />
          <div className="spacer"/>
          <div className="d">
            <button
              className="b"
              onClick={() => {
                let el = (document.querySelectorAll('.dd')[1] as HTMLElement);
                if (el) {
                  el.style.display = 'block';
                }
              }}
            >
              MI
            </button>
            <DropdownIcon/>
            <div className="dd">
              <div
                onClick={this.outputSelect}
                className="outputOption"
                data-abbrev="nm"
              >
                Nautical Miles
              </div>
              <div
                className="outputOption"
                onClick={this.outputSelect}
                data-abbrev="mi"
              >
                Miles
              </div>
              <div
                className="outputOption"
                onClick={this.outputSelect}
                data-abbrev="km"
              >
                Kilometers
              </div>
              <div
                className="outputOption"
                onClick={this.outputSelect}
                data-abbrev="m"
              >
                Meters
              </div>
              <div
                className="outputOption"
                onClick={this.outputSelect}
                data-abbrev="yd"
              >
                Yards
              </div>
              <div
                className="outputOption"
                onClick={this.outputSelect}
                data-abbrev="ft"
              >
                Feet
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export const StyledMeasurementConverter = inject('metricActions', 'measurementConverterStore')
(styled(MeasurementConverter)`

  width: 95%;
  height: 135px;
  background-color: #292E33;
  border-radius: 4px;
  margin-left: 7px;
  margin-top: 8px;
  box-shadow: 0px 3px 6px rgba(0,0,0,0.3);
  overflow: visible;

  .title {
    font-size: 24px;
    color: white;
    width: 95%;
    margin: auto;
    text-align: center;
    white-space: nowrap;
  }
  
  input {
    margin-left: 7px;
    width: 70%;
    margin-right: 20px;
    display: inline-block;
    outline: none;
    background: #292e33;
    font-size: 18px;
    color: #fff;
    border: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  }
  
  input:focus {
    border-bottom: 1px solid #6C9CD5;
  }
  
  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  
  input[type="number"] {
    -moz-appearance: textfield;
  }
  
  input::placeholder {
    color: rgba(255, 255, 255, 0.2);
  }
  
  .conversionOutput {
    cursor: text;
    width: 70%;
    border-radius: 4px;
    background: #5B5D60;
    border: none;
    position: relative;
    top: 3px;
    text-indent: 3px;
  }
  
  .row {
    margin-top: 10px;
    width: 100%;
  }

  .b {
    display: inline-block;
    background-color: #292E33;
    outline: none;
    border: none;
    color: #EEF5FC;
    width: 100%;
    font-size: 14px;
    text-align: left;
  }
  
  .d {
    display: inline-block;
    position: relative;
    width: 18%;
  }
  
  .dd {
    position: absolute;
    display: none;
    width: 82px;
    height: 100px;
    left: -24px;
    border-radius: 4px;
    background: #292E33;
    z-index: 125;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
  
  svg {
    pointer-events: none;
    margin-left: -15px;
  }
  
  .spacer {
    height: 23px;
    border-left: 1px solid #c4c4c4;
    display: inline-block;
    padding-right: 10px;
    position: relative;
    top: 8px;
  }
  
  .ddd, .outputOption {
    width: 100%;
    transition: background-color 0.5s ease;
    font-size: 12px;
    color: #EEF5FC;
    padding-left: 2px;
        
    :hover {
      background-color: #5689F3;
    }
  }
  
  .selected {
    background-color: #5689F3;
   }

`);