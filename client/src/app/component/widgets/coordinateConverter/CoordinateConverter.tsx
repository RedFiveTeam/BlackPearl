import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { UpArrowIcon } from '../../../icon/UpArrowIcon';
import { DownArrowIcon } from '../../../icon/DownArrowIcon';
import { MetricActions } from '../../metrics/metric/MetricActions';
import { LogableActions } from '../../metrics/metric/MetricModel';
import { observable } from 'mobx';

interface Props {
  className?: string;
  mgrs: string;
  latLong: string;
  mgrsFunction: (e: any) => void;
  latLongFunction: (e: any) => void;
  metricActions?: MetricActions;
}

@observer
export class CoordinateConverter extends React.Component<Props> {
  @observable latLong = this.props.latLong;
  @observable mgrs = this.props.mgrs;

  componentWillReceiveProps(newProps: Props) {
    this.latLong = newProps.latLong;
    this.mgrs = newProps.mgrs;
  }

  render() {
    return (
      <div
        className={this.props.className}
      >
        <div className="title">Coordinate Converter</div>
        <input
          className="latLongInput"
          placeholder="Lat/Long"
          value={this.latLong}
          onClick={() => this.props.metricActions!.logMetric(LogableActions.CLICK_COORD, 'LatLong')}
          onChange={this.props.latLongFunction}
        />
        <div className="iconContainer"><UpArrowIcon/><DownArrowIcon/></div>
        <input
          className="mgrsInput"
          placeholder="MGRS"
          value={this.mgrs}
          onClick={() => this.props.metricActions!.logMetric(LogableActions.CLICK_COORD, 'MGRS')}
          onChange={this.props.mgrsFunction}
        />
      </div>
    );
  }
}

export const StyledCoordinateConverter = inject('metricActions')(styled(CoordinateConverter)`
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
`);