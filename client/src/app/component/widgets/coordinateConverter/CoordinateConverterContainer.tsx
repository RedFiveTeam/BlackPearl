import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { CoordinateConverterActions } from './CoordinateConverterActions';
import { CoordinateConverterStore } from './CoordinateConverterStore';

interface Props {
  className?: string;
  coordinateConverterActions?: CoordinateConverterActions;
  coordinateConverterStore?: CoordinateConverterStore;
}

@observer
export class CoordinateConverterContainer extends React.Component<Props> {
  render() {
    return (
      <div className={this.props.className}>
        <div className="title">Coordinate Converter</div>
        <input
          className="latLongInput"
          placeholder="Lat/Long"
          onChange={(e) => this.props.coordinateConverterActions!.convertToMGRS(e.target.value)}
        /><br/>
        <input
          className="mgrsInput"
          placeholder="MGRS"
          contentEditable={false}
          value={this.props.coordinateConverterStore!.mgrs}
        />
      </div>
    );
  }
}

export const StyledCoordinateConverterContainer = inject('coordinateConverterActions', 'coordinateConverterStore')
(styled(CoordinateConverterContainer)`
  font-family: Alegreya Sans;
  text-align: center;
  font-size: 24px;
  color: #FFFFFF;
  background: #364958;
  width: 350px;
  min-width: 350px;
  height: 160px;
  border-radius: 10px;
  margin-left: 8px;
  margin-top: 10px;
  box-shadow: -1px 3px 3px rgba(0, 0, 0, .25);
  
  .title {
    height: 48px;
    line-height: 48px;
  }
  
  .latLongInput {
    margin-bottom: 28px;
    ::placeholder {
       color: #15191C;
       opacity: .25;
    }
  }
  
  .mgrsInput {
    background: #C0C0C0;
    margin-bottom: 8px;
    ::placeholder {
       color: #15191C;
       opacity: .4;
    }
  }
  
  input {
    width: 324px;
    height: 34px;
    font-size: 18px;
    font-weight: bold;
    border: none;
    outline: none;
  }
`);