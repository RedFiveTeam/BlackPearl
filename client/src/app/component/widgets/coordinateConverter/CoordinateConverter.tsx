import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
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
  @observable latLong = this.props.latLong ? this.props.latLong : '';
  @observable mgrs = this.props.mgrs ? this.props.mgrs : '';

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
          onClick={async () => await this.props.metricActions!.logMetric(LogableActions.CLICK_COORD, 'LatLong')}
          onChange={this.props.latLongFunction}
        />
        <input
          className="mgrsInput"
          placeholder="MGRS"
          value={this.mgrs}
          onClick={async () => await this.props.metricActions!.logMetric(LogableActions.CLICK_COORD, 'MGRS')}
          onChange={this.props.mgrsFunction}
        />
      </div>
    );
  }
}

export const StyledCoordinateConverter = inject('metricActions')(styled(CoordinateConverter)`
  text-align: center;
  font-size: 24px;
  color: #FFF;
  background: #292E33;
  width: 95%;
  height: 145px;
  border-radius: 4px;
  margin-left: 7px;
  margin-top: 8px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.3);
  
  .title {
    height: 48px;
    line-height: 48px;
    white-space: nowrap;
  }
  
  .latLongInput {
    background: #292E33;
    width: 90%;
    height: 20px;
    color: #FFFFFF;
    border-bottom: 1px solid rgba(255,255,255,0.2);
    font-weight: 100;
    :focus {
      border-bottom: 1px solid #6C9CD5;
    }
    ::placeholder {
       color: rgba(255, 255, 255, 0.2);
       font-weight: 100;
    }
  }
  
  .mgrsInput {
    background: #292E33;
    width: 90%;
    height: 20px;
    color: #FFF;
    margin-top: 15px;
    border-bottom: 1px solid rgba(255,255,255,0.2);
    font-weight: 100;
    :focus {
      border-bottom: 1px solid #6C9CD5;
    }
    ::placeholder {
       color: rgba(255, 255, 255, 0.2);
       font-weight: 100;
    }
  }

  input {
    width: 90%;
    height: 34px;
    font-size: 18px;
    font-weight: bold;
    border: none;
    outline: none;
  }

`);