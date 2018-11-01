import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { CoordinateConverterActions } from './actions/CoordinateConverterActions';
import { CoordinateConverterStore } from './store/CoordinateConverterStore';
import { StyledCoordinateConverter } from './CoordinateConverter';

interface Props {
  className?: string;
  coordinateConverterActions?: CoordinateConverterActions;
  coordinateConverterStore?: CoordinateConverterStore;
}

@observer
export class CoordinateConverterContainer extends React.Component<Props> {
  mgrsFunction = (e: any) => this.props.coordinateConverterActions!.convertToLatLong(e.target.value);
  latLongFunction = (e: any) => this.props.coordinateConverterActions!.convertToMGRS(e.target.value);

  render() {
    return (
      <div className={this.props.className}>
        <StyledCoordinateConverter
          mgrs={this.props.coordinateConverterStore!.mgrs}
          latLong={this.props.coordinateConverterStore!.latLong}
          mgrsFunction={this.mgrsFunction}
          latLongFunction={this.latLongFunction}
        />
      </div>
    );
  }
}

export const StyledCoordinateConverterContainer = inject('coordinateConverterActions', 'coordinateConverterStore')
(styled(CoordinateConverterContainer)`
`);