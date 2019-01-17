import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { StyledMeasurementConverter } from './MeasurementConverter';
import { MeasurementConverterStore } from './MeasurementConverterStore';
import { MeasurementConverterActions } from './MeasurementConverterActions';

interface Props {
  className?: string;
  measurementConverterStore?: MeasurementConverterStore;
  measurementConverterActions?: MeasurementConverterActions;
}

@observer
export class MeasurementConverterContainer extends React.Component<Props> {
  convertFunction = () => {
    (document.querySelector('.conversionOutput') as HTMLInputElement).value =
      this.props.measurementConverterActions!.convertInputToFeet(
        this.props.measurementConverterStore!.inputConversionNumber).toString();
  };

  render() {
    return (
      <div
        className={this.props.className}
      >
        <StyledMeasurementConverter
          conversionNumber={this.props.measurementConverterStore!.inputConversionNumber}
          convertFunction={this.convertFunction}
        />
      </div>
    );
  }
}

export const StyledMeasurementConverterContainer = inject('measurementConverterStore', 'measurementConverterActions')
(styled(MeasurementConverterContainer)`

`);