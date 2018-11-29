import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { AdminStore } from '../../../../page/stores/AdminStore';

interface Props {
  className?: string;
  adminStore?: AdminStore;
}

@observer
export class WeatherTab extends React.Component<Props> {
  render() {
    return (
      <div
        className={this.props.className}
      >
        <div className="weather">
          {
            this.props.adminStore!.weather &&
            this.props.adminStore!.weather.map((w, index) => {
              return (
                <div
                  key={index}
                  className="weatherRow"
                >
                  <input
                    value={w.label}
                    className="weatherLabel"
                    placeholder="Location"
                    onChange={(e) => this.props.adminStore!.setWeatherLabel(index, e.target.value)}
                  />
                  <input
                    value={w.url}
                    className="weatherURL"
                    placeholder="Address"
                    onChange={(e) => this.props.adminStore!.setWeatherUrl(index, e.target.value)}
                  />
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }
}

export const StyledWeatherTab = inject('adminStore')(styled(WeatherTab)`
margin-top: 10px;
margin-left: 10px;

.weatherRow:first-of-type {
  border-top: 1px solid #DFDFDF;
}

.weatherRow {
  height: 34px;
  width: 560px;
  line-height: 34px;
  border-bottom: 1px solid #DFDFDF;
  white-space: nowrap;
}

input {
  border: none;
  border-radius: 5px;
  font-family: Amaranth;
  font-size: 18px;
  height: 18px;
  ::placeholder {
    color: #C7C7C7;
  }
}

.weatherLabel {
  margin-left: 4px;
  width: 156px;
}

.weatherURL {
  margin-left: 9px;
  width: 387px;
}

`);