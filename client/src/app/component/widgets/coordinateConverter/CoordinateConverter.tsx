import * as React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import { UpArrowIcon } from '../../../icon/UpArrowIcon';
import { DownArrowIcon } from '../../../icon/DownArrowIcon';

interface Props {
  className?: string;
  mgrs: string;
  latLong: string;
  mgrsFunction: (e: any) => void;
  latLongFunction: (e: any) => void;
}

@observer
export class CoordinateConverter extends React.Component<Props> {
  render() {
    return (
      <div
        className={this.props.className}
      >
        <div className="title">Coordinate Converter</div>
        <input
          className="latLongInput"
          placeholder="Lat/Long"
          value={this.props.latLong}
          onChange={this.props.latLongFunction}
        />
        <div className="iconContainer"><UpArrowIcon/><DownArrowIcon/></div>
        <input
          className="mgrsInput"
          placeholder="MGRS"
          value={this.props.mgrs}
          onChange={this.props.mgrsFunction}
        />
      </div>
    );
  }
}

export const StyledCoordinateConverter = styled(CoordinateConverter)`
  font-family: Amaranth;
  text-align: center;
  font-size: 24px;
  color: #FFFFFF;
  background: #364958;
  width: 350px;
  min-width: 350px;
  height: 165px;
  border-radius: 10px;
  margin-left: 8px;
  margin-top: 10px;
  box-shadow: -1px 3px 3px rgba(0, 0, 0, .25);
  
  .title {
    height: 48px;
    line-height: 48px;
  }
  
  .latLongInput {
    ::placeholder {
       color: #15191C;
       opacity: .25;
       padding-left: 5px;
    }
  }
  
  .invertedIcon {
    transform: rotate(180);
  }
  
  .iconContainer {
    height: 30px;
    width: 100px;
    line-height: 30px;
    justify-content: space-evenly;
    display: inline-flex;
    align-items: center;
  }
  
  .mgrsInput {
     ::placeholder {
       color: #15191C;
       opacity: .25;
       padding-left: 5px;
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
`;